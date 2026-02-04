/**
 * CSAG Scraper (Archive months -> posts -> JSON)
 * - Scrapes each month archive URL and extracts posts
 * - Preserves FULL HTML (including <a href="..."> links)
 * - Absolutifies all href/src so links still work when rendered elsewhere
 * - Falls back to single-post page if archive content is empty
 *
 * Usage:
 *   node scrape-csag.js
 */

const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const slugify = require("slugify");

const OUTPUT_DIR = path.join(__dirname, "out");
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

/** Simple concurrency pool (no p-limit dependency) */
async function asyncPool(limit, array, iteratorFn) {
  const ret = [];
  const executing = [];
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);

    if (limit <= array.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}

// ✅ Put your month URLs here (your <ul> list)
const ARCHIVE_URLS = [
  "https://www.csagup.org/2025/03/",
  "https://www.csagup.org/2024/11/",
  "https://www.csagup.org/2024/10/",
  "https://www.csagup.org/2024/09/",
  "https://www.csagup.org/2023/10/",
  "https://www.csagup.org/2023/07/",
  "https://www.csagup.org/2023/06/",
  "https://www.csagup.org/2023/05/",
  "https://www.csagup.org/2023/04/",
  "https://www.csagup.org/2023/03/",
  "https://www.csagup.org/2022/10/",
  "https://www.csagup.org/2021/09/",
  "https://www.csagup.org/2021/08/",
  "https://www.csagup.org/2021/06/",
  "https://www.csagup.org/2021/05/",
  "https://www.csagup.org/2020/12/",
  "https://www.csagup.org/2020/11/",
  "https://www.csagup.org/2020/09/",
  "https://www.csagup.org/2020/08/",
  "https://www.csagup.org/2020/07/",
  "https://www.csagup.org/2020/06/",
  "https://www.csagup.org/2020/05/",
  "https://www.csagup.org/2020/04/",
  "https://www.csagup.org/2019/12/",
  "https://www.csagup.org/2019/09/",
  "https://www.csagup.org/2019/07/",
  "https://www.csagup.org/2019/05/",
  "https://www.csagup.org/2019/02/",
  "https://www.csagup.org/2019/01/",
  "https://www.csagup.org/2018/12/",
  "https://www.csagup.org/2018/10/",
  "https://www.csagup.org/2018/09/",
  "https://www.csagup.org/2018/08/",
  "https://www.csagup.org/2018/07/",
  "https://www.csagup.org/2018/06/",
  "https://www.csagup.org/2018/05/",
];

// polite-ish headers
const http = axios.create({
  timeout: 30000,
  headers: {
    "User-Agent": "CSAG-Archive-Migrator/1.0 (+contact: you@example.com)",
    Accept: "text/html,application/xhtml+xml",
  },
});

function safeSlug(input) {
  return slugify(String(input || "untitled"), {
    lower: true,
    strict: true,
  }).slice(0, 80);
}

function monthKeyFromUrl(url) {
  // https://www.csagup.org/2025/03/ -> 2025-03
  const m = url.match(/\/(\d{4})\/(\d{2})\/$/);
  return m ? `${m[1]}-${m[2]}` : safeSlug(url);
}

async function fetchHtml(url) {
  const res = await http.get(url);
  return res.data;
}

/**
 * IMPORTANT:
 * - Keeps <a> tags intact
 * - Converts relative href/src to absolute
 * - Preserves entities (decodeEntities: false)
 */
function absolutifyContentHtml(contentHtml, baseUrl) {
  const $ = cheerio.load(contentHtml, { decodeEntities: false });

  // <a href="...">
  $("a[href]").each((_, a) => {
    const href = $(a).attr("href");
    if (!href) return;

    // skip anchors, mailto, tel, javascript
    if (
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:")
    ) {
      return;
    }

    try {
      $(a).attr("href", new URL(href, baseUrl).toString());
    } catch {}
  });

  // <img src="...">
  $("img[src]").each((_, img) => {
    const src = $(img).attr("src");
    if (!src) return;
    try {
      $(img).attr("src", new URL(src, baseUrl).toString());
    } catch {}
  });

  // lazy images: data-src -> src
  $("img[data-src]").each((_, img) => {
    const dataSrc = $(img).attr("data-src");
    if (!dataSrc) return;
    try {
      $(img).attr("src", new URL(dataSrc, baseUrl).toString());
    } catch {}
  });

  return $.root().html() || "";
}

/** Extracts links/images AFTER absolutifying */
function extractLinksFromHtml(html, baseUrl) {
  const $ = cheerio.load(html, { decodeEntities: false });

  const links = new Set();
  $("a[href]").each((_, a) => {
    const href = $(a).attr("href");
    if (!href) return;
    try {
      links.add(new URL(href, baseUrl).toString());
    } catch {}
  });

  const images = new Set();
  $("img[src]").each((_, img) => {
    const src = $(img).attr("src");
    if (!src) return;
    try {
      images.add(new URL(src, baseUrl).toString());
    } catch {}
  });

  return { links: [...links], images: [...images] };
}

/**
 * Parses a month archive page (list of articles).
 * NOTE: Archive pages often include full content. We keep it.
 * If content is empty, we'll fallback to parseSinglePost().
 */
function parseArchivePage(html, archiveUrl) {
  const $ = cheerio.load(html, { decodeEntities: false });

  const main = $(
    "main.av-main-archive, main.content.av-main-archive, main[role='main']",
  );
  if (!main.length) {
    console.warn(`⚠️ No <main> found for archive: ${archiveUrl}`);
  }

  const articles = [];
  main.find("article.post-entry").each((_, el) => {
    const a = $(el);

    const titleAnchor = a.find("h2.post-title a").first();
    const title = titleAnchor.text().trim();

    const permalink = titleAnchor.attr("href")
      ? new URL(titleAnchor.attr("href"), archiveUrl).toString()
      : null;

    const dateIso =
      a.find("time[itemprop='datePublished']").attr("datetime") || null;
    const dateLabel = a.find("time.date-container").text().trim() || null;

    const author =
      a.find(".blog-author .fn a, .blog-author .fn").first().text().trim() ||
      null;

    const categories = [];
    a.find(".blog-categories a").each((_, c) =>
      categories.push($(c).text().trim()),
    );

    const tags = [];
    a.find(".blog-tags a").each((_, t) => tags.push($(t).text().trim()));

    // featured/preview image from the small preview
    const featuredImage =
      a.find("a.small-preview img").attr("data-src") ||
      a.find("a.small-preview img").attr("src") ||
      null;

    // ✅ Extract full HTML (preserves <a href="...">)
    const contentEl = a.find("div.entry-content[itemprop='text']").first();
    const contentHtmlRaw = contentEl.html() || "";
    const contentHtml = absolutifyContentHtml(
      contentHtmlRaw,
      permalink || archiveUrl,
    );

    const contentText = contentEl.text().replace(/\s+/g, " ").trim();

    const { links, images } = extractLinksFromHtml(
      contentHtml,
      permalink || archiveUrl,
    );

    articles.push({
      title,
      permalink,
      datePublished: dateIso,
      dateLabel,
      author,
      categories,
      tags,
      featuredImage,
      contentHtml,
      contentText,
      contentLinks: links,
      contentImages: images,
      sourceArchive: archiveUrl,
    });
  });

  return articles;
}

/**
 * Parses an individual post page (single-big).
 * This is more reliable for full content + correct <a href>.
 */
function parseSinglePost(html, postUrl) {
  const $ = cheerio.load(html, { decodeEntities: false });

  const article = $("main.av-main-single article.post-entry").first().length
    ? $("main.av-main-single article.post-entry").first()
    : $("article.post-entry").first();

  const title =
    article.find("h1.post-title, h1.entry-title").first().text().trim() ||
    $("h1").first().text().trim() ||
    null;

  const dateIso =
    article.find("time[itemprop='datePublished']").attr("datetime") ||
    $("time[itemprop='datePublished']").attr("datetime") ||
    null;

  const dateLabel =
    article.find("time.date-container").first().text().trim() ||
    $("time.date-container").first().text().trim() ||
    null;

  const author =
    article
      .find(".blog-author .fn a, .blog-author .fn, span.author .fn a")
      .first()
      .text()
      .trim() || null;

  const categories = [];
  article
    .find(".blog-categories a")
    .each((_, c) => categories.push($(c).text().trim()));

  const tags = [];
  article.find(".blog-tags a").each((_, t) => tags.push($(t).text().trim()));

  const featuredImage =
    article.find(".big-preview img").attr("data-src") ||
    article.find(".big-preview img").attr("src") ||
    $("meta[property='og:image']").attr("content") ||
    null;

  const contentEl = article.find("div.entry-content[itemprop='text']").first()
    .length
    ? article.find("div.entry-content[itemprop='text']").first()
    : article.find("div.entry-content").first();

  const contentHtmlRaw = contentEl.html() || "";
  const contentHtml = absolutifyContentHtml(contentHtmlRaw, postUrl);

  const contentText = contentEl.text().replace(/\s+/g, " ").trim();

  const { links, images } = extractLinksFromHtml(contentHtml, postUrl);

  return {
    title,
    permalink: postUrl,
    datePublished: dateIso,
    dateLabel,
    author,
    categories,
    tags,
    featuredImage,
    contentHtml,
    contentText,
    contentLinks: links,
    contentImages: images,
    sourceArchive: null,
  };
}

async function scrapeMonth(archiveUrl) {
  const key = monthKeyFromUrl(archiveUrl);
  const monthDir = path.join(OUTPUT_DIR, key);
  if (!fs.existsSync(monthDir)) fs.mkdirSync(monthDir, { recursive: true });

  console.log(`\n📅 Scraping month: ${key}  (${archiveUrl})`);
  const html = await fetchHtml(archiveUrl);
  let articles = parseArchivePage(html, archiveUrl);

  // Fallback: if archive contains no posts at all
  if (!articles.length) {
    console.warn(`⚠️ No posts detected on archive: ${archiveUrl}`);
  }

  // If any article has empty contentHtml but has a permalink, fetch the permalink
  articles = await asyncPool(4, articles, async (a) => {
    const needsFallback =
      (!a.contentHtml || a.contentHtml.trim() === "") && a.permalink;
    if (!needsFallback) return a;

    try {
      const postHtml = await fetchHtml(a.permalink);
      const full = parseSinglePost(postHtml, a.permalink);
      return { ...a, ...full, sourceArchive: a.sourceArchive };
    } catch (e) {
      console.warn(`⚠️ Failed fallback fetch: ${a.permalink}`);
      return a;
    }
  });

  // Save month index
  fs.writeFileSync(
    path.join(monthDir, `_month.json`),
    JSON.stringify({ archiveUrl, count: articles.length }, null, 2),
  );

  // Save each article as JSON
  for (let i = 0; i < articles.length; i++) {
    const a = articles[i];
    const filename = `${String(i + 1).padStart(3, "0")}-${safeSlug(a.title)}.json`;
    fs.writeFileSync(path.join(monthDir, filename), JSON.stringify(a, null, 2));
  }

  console.log(`✅ Saved ${articles.length} articles to out/${key}/`);
  return { key, count: articles.length };
}

(async function main() {
  const results = [];
  for (const url of ARCHIVE_URLS) {
    try {
      results.push(await scrapeMonth(url));
    } catch (e) {
      console.error(`❌ Failed month: ${url}\n`, e.message);
    }
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, `_summary.json`),
    JSON.stringify(results, null, 2),
  );
  console.log("\n🎉 Done. Summary written to out/_summary.json");
})();
