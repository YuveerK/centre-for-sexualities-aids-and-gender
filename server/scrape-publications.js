/**
 * scrape-publications.js
 *
 * Scrapes CSA&G publications from a page structured like your snippet:
 * - Category headings: h3.av-special-heading-tag (e.g., "Social Justice", "Gender Justice", etc.)
 * - Items: section.av_toggle_section
 *   - Title: p.toggler (or data-title)
 *   - Description: .toggle_content (paragraph text, excluding download card text as best as possible)
 *   - Download page: .package-title a[href]
 *   - Direct download URL: a.wpdm-download-link[data-downloadurl]
 *
 * Output:
 * - publications.json
 * - publications.csv
 *
 * Usage:
 *   npm i axios cheerio
 *   node scrape-publications.js "https://www.csagup.org/publications/"   // (replace with real URL)
 */

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const DEFAULT_URL = "https://www.csagup.org/publications/"; // change if needed

function cleanText(s = "") {
  return s
    .replace(/\s+/g, " ")
    .replace(/\u00a0/g, " ")
    .trim();
}

function extractYear(title) {
  // tries to find a year like (2023) or 2023
  const m = title.match(/\b(19|20)\d{2}\b/);
  return m ? Number(m[0]) : null;
}

function toCsv(rows) {
  const headers = [
    "category",
    "title",
    "year",
    "description",
    "downloadPageUrl",
    "directDownloadUrl",
    "thumbnailUrl",
  ];

  const esc = (v) => {
    const s = v == null ? "" : String(v);
    // wrap in quotes and escape quotes
    return `"${s.replace(/"/g, '""')}"`;
  };

  const lines = [
    headers.map(esc).join(","),
    ...rows.map((r) => headers.map((h) => esc(r[h])).join(",")),
  ];
  return lines.join("\n");
}

async function fetchHtml(url) {
  const res = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Safari",
      Accept: "text/html,application/xhtml+xml",
    },
    timeout: 30000,
    validateStatus: (s) => s >= 200 && s < 400,
  });
  return res.data;
}

async function scrape(url) {
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);

  const results = [];

  // Each category appears like:
  // <div class="flex_column ...">
  //   <h3 class="av-special-heading-tag">Category</h3>
  //   <div class="togglecontainer ...">
  //     <section class="av_toggle_section">...</section>
  //     ...
  //   </div>
  // </div>
  $(".flex_column").each((_, col) => {
    const $col = $(col);

    const category = cleanText(
      $col.find("h3.av-special-heading-tag").first().text(),
    );
    if (!category) return;

    $col.find("section.av_toggle_section").each((__, sec) => {
      const $sec = $(sec);

      const $toggler = $sec.find("p.toggler").first();
      const title =
        cleanText($toggler.text()) ||
        cleanText($toggler.attr("data-title")) ||
        cleanText($toggler.attr("data-aria_collapsed")) ||
        "";

      const year = extractYear(title);

      // Thumbnail
      const thumbnailUrl =
        $sec.find(".toggle_content img").first().attr("src") ||
        $sec.find(".toggle_content img").first().attr("data-src") ||
        null;

      // Download page + direct download URL
      const downloadPageUrl =
        $sec.find(".package-title a").first().attr("href") || null;
      const directDownloadUrl =
        $sec.find("a.wpdm-download-link").first().attr("data-downloadurl") ||
        null;

      // Description: grab visible text in toggle_content but try to exclude the download-card bits
      // Strategy:
      // - clone toggle_content
      // - remove .w3eden (download manager block)
      // - remove images
      // - then take text
      const $content = $sec.find(".toggle_content").first();
      let description = "";
      if ($content.length) {
        const $clone = $content.clone();
        $clone.find(".w3eden").remove();
        $clone.find("img").remove();
        description = cleanText($clone.text());
      }

      // Avoid empty items
      if (!title && !downloadPageUrl && !directDownloadUrl) return;

      results.push({
        category,
        title,
        year,
        description,
        downloadPageUrl,
        directDownloadUrl,
        thumbnailUrl,
      });
    });
  });

  return results;
}

(async () => {
  const url = process.argv[2] || DEFAULT_URL;

  try {
    const publications = await scrape(url);

    fs.writeFileSync(
      "publications.json",
      JSON.stringify(publications, null, 2),
      "utf8",
    );
    fs.writeFileSync("publications.csv", toCsv(publications), "utf8");

    console.log(`✅ Scraped ${publications.length} publications`);
    console.log(`- publications.json`);
    console.log(`- publications.csv`);

    // Quick sample
    console.log("\nSample:");
    console.log(publications.slice(0, 3));
  } catch (err) {
    console.error("❌ Scrape failed:", err?.message || err);
    process.exit(1);
  }
})();
