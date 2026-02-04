import { useMemo, useState } from "react";

const modules = import.meta.glob("../../server/out/**/*.json", { eager: true });

const articles = Object.entries(modules)
  .filter(([path]) => {
    const filename = path.split("/").pop() || "";
    return !filename.startsWith("_");
  })
  .map(([, module]) => module.default || module)
  .filter((item) => item && item.title && item.permalink)
  .sort((a, b) => {
    const aDate = new Date(a.datePublished || a.dateLabel || 0).getTime();
    const bDate = new Date(b.datePublished || b.dateLabel || 0).getTime();
    return bDate - aDate;
  });

const getDateKey = (article) => {
  if (article.datePublished) {
    const date = new Date(article.datePublished);
    if (!Number.isNaN(date.getTime())) {
      const year = date.getFullYear();
      const month = date.toLocaleString("en-US", { month: "long" });
      return {
        year,
        month,
        key: `${year}-${String(date.getMonth() + 1).padStart(2, "0")}`,
      };
    }
  }
  return { year: "Unknown", month: "Unknown", key: "unknown" };
};

const getExcerpt = (text, limit = 200) => {
  if (!text) return "";
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= limit) return cleaned;
  return `${cleaned.slice(0, limit).trim()}...`;
};

const normalizeHtml = (html) => {
  if (!html) return "";
  return html
    .replace(/<a\b(?![^>]*\btarget=)[^>]*>/gi, (match) =>
      match.replace("<a", '<a target="_blank"'),
    )
    .replace(/<a\b(?![^>]*\brel=)[^>]*>/gi, (match) =>
      match.replace("<a", '<a rel="noreferrer"'),
    );
};

export default function News() {
  const [activeArticle, setActiveArticle] = useState(null);
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [page, setPage] = useState(1);

  const closeModal = () => setActiveArticle(null);

  const articlesWithDate = useMemo(
    () =>
      articles.map((article) => {
        const { year, month, key } = getDateKey(article);
        const monthIndex =
          year === "Unknown"
            ? "00"
            : String(new Date(`${month} 1, ${year}`).getMonth() + 1).padStart(
                2,
                "0",
              );
        return {
          ...article,
          _year: year,
          _month: month,
          _monthIndex: monthIndex,
          _key: key,
        };
      }),
    [],
  );

  const availableYears = useMemo(() => {
    const years = Array.from(
      new Set(articlesWithDate.map((article) => article._year)),
    )
      .filter((year) => year !== "Unknown")
      .sort((a, b) => b - a);
    return years;
  }, [articlesWithDate]);

  const availableMonths = useMemo(() => {
    if (selectedYear === "all") return [];
    const months = Array.from(
      new Set(
        articlesWithDate
          .filter((article) => article._year === Number(selectedYear))
          .map((article) => article._monthIndex),
      ),
    ).sort((a, b) => b.localeCompare(a));
    return months;
  }, [articlesWithDate, selectedYear]);

  const filteredArticles = useMemo(() => {
    return articlesWithDate.filter((article) => {
      if (selectedYear !== "all" && article._year !== Number(selectedYear))
        return false;
      if (selectedMonth !== "all" && article._monthIndex !== selectedMonth)
        return false;
      return true;
    });
  }, [articlesWithDate, selectedMonth, selectedYear]);

  const pageSize = 12;
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const pageEnd = pageStart + pageSize;
  const pagedArticles = filteredArticles.slice(pageStart, pageEnd);

  const groupedArticles = pagedArticles.reduce((acc, article) => {
    const groupKey = article._key;
    if (!acc[groupKey]) {
      acc[groupKey] = { year: article._year, month: article._month, items: [] };
    }
    acc[groupKey].items.push(article);
    return acc;
  }, {});

  const groupOrder = Object.values(groupedArticles).sort((a, b) => {
    const aKey =
      a.year === "Unknown"
        ? "0000-00"
        : `${a.year}-${String(new Date(`${a.month} 1, ${a.year}`).getMonth() + 1).padStart(2, "0")}`;
    const bKey =
      b.year === "Unknown"
        ? "0000-00"
        : `${b.year}-${String(new Date(`${b.month} 1, ${b.year}`).getMonth() + 1).padStart(2, "0")}`;
    return bKey.localeCompare(aKey);
  });

  return (
    <main className="bg-sand-50 text-ink-900">
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
        <p className="section-kicker">CSA&G</p>
        <h1 className="section-title text-4xl sm:text-5xl">News / Articles</h1>
        <p className="mt-6 max-w-3xl text-lg text-ink-700">
          Browse updates, views, and events from the Centre for Sexualities,
          AIDS & Gender.
        </p>
        <p className="mt-3 text-sm text-ink-600">
          {articles.length} articles available.
        </p>
        <div className="mt-8 flex flex-wrap items-end gap-4">
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-ink-600">
              Year
            </label>
            <select
              className="mt-2 w-40 rounded-2xl border border-ink-900/10 bg-white px-4 py-2 text-sm"
              value={selectedYear}
              onChange={(event) => {
                setSelectedYear(event.target.value);
                setSelectedMonth("all");
                setPage(1);
              }}
            >
              <option value="all">All</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-ink-600">
              Month
            </label>
            <select
              className="mt-2 w-40 rounded-2xl border border-ink-900/10 bg-white px-4 py-2 text-sm"
              value={selectedMonth}
              onChange={(event) => {
                setSelectedMonth(event.target.value);
                setPage(1);
              }}
              disabled={selectedYear === "all"}
            >
              <option value="all">All</option>
              {availableMonths.map((monthIndex) => {
                const monthName = new Date(
                  `2020-${monthIndex}-01`,
                ).toLocaleString("en-US", { month: "long" });
                return (
                  <option key={monthIndex} value={monthIndex}>
                    {monthName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="text-sm text-ink-600">
            Showing {filteredArticles.length === 0 ? 0 : pageStart + 1}-
            {Math.min(pageEnd, filteredArticles.length)} of{" "}
            {filteredArticles.length}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-10">
        <div className="space-y-10">
          {groupOrder.map((group) => (
            <section key={`${group.year}-${group.month}`}>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-ink-600">
                    {group.year}
                  </p>
                  <h2 className="font-display text-3xl text-ink-950">
                    {group.month}
                  </h2>
                </div>
                <p className="text-sm text-ink-600">
                  {group.items.length} articles
                </p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                {group.items.map((article) => (
                  <article
                    key={article.permalink}
                    className="rounded-3xl border border-ink-900/10 bg-white p-6 shadow-lift"
                  >
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-ink-600">
                      <span>{article.categories?.[0] || "News"}</span>
                      <span>-</span>
                      <span>{article.dateLabel || "Date pending"}</span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl text-ink-950">
                      {article.title}
                    </h3>
                    {article.author && (
                      <p className="mt-2 text-sm text-ink-600">
                        By {article.author}
                      </p>
                    )}
                    {article.featuredImage && (
                      <div className="mt-5 overflow-hidden rounded-2xl border border-ink-900/10">
                        <img
                          src={article.featuredImage}
                          alt=""
                          className="h-40 w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    {article.contentText && (
                      <p className="mt-5 text-sm text-ink-700">
                        {getExcerpt(article.contentText)}
                      </p>
                    )}
                    <div className="mt-6">
                      <button
                        className="text-sm font-semibold text-ink-950 underline-offset-4 hover:underline"
                        onClick={() => setActiveArticle(article)}
                      >
                        Read full article
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
          {filteredArticles.length === 0 && (
            <div className="rounded-3xl border border-ink-900/10 bg-white p-10 text-center text-sm text-ink-600">
              No articles match the selected filters.
            </div>
          )}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <button
            className="rounded-full border border-ink-900/20 px-5 py-2 text-sm font-semibold text-ink-900 disabled:opacity-40"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p className="text-sm text-ink-600">
            Page {currentPage} of {totalPages}
          </p>
          <button
            className="rounded-full border border-ink-900/20 px-5 py-2 text-sm font-semibold text-ink-900 disabled:opacity-40"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </section>

      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 px-6 py-10">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-lift">
            <div className="flex items-center justify-between border-b border-ink-900/10 px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-ink-600">
                  {activeArticle.categories?.[0] || "News"} -{" "}
                  {activeArticle.dateLabel || "Date pending"}
                </p>
                <h2 className="mt-2 font-display text-2xl text-ink-950">
                  {activeArticle.title}
                </h2>
              </div>
              <button
                className="rounded-full border border-ink-900/20 px-4 py-2 text-sm font-semibold text-ink-900"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
              {activeArticle.author && (
                <p className="text-sm text-ink-600">
                  By {activeArticle.author}
                </p>
              )}
              {activeArticle.featuredImage && (
                <div className="mt-5 overflow-hidden rounded-2xl border border-ink-900/10">
                  <img
                    src={activeArticle.featuredImage}
                    alt=""
                    className="h-64 w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              {activeArticle.contentHtml ? (
                <div
                  className="article-content mt-6 max-w-none text-ink-800"
                  dangerouslySetInnerHTML={{
                    __html: normalizeHtml(activeArticle.contentHtml),
                  }}
                />
              ) : (
                <p className="mt-6 text-sm text-ink-700">
                  Full content is not available for this article yet.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
