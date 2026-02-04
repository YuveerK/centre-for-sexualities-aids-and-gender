import { useMemo, useState } from 'react'
import publicationsData from '../../server/publications.json'

const publications = Array.isArray(publicationsData) ? publicationsData : []

const getYearLabel = (year) => (year ? String(year) : 'Year N/A')

export default function Publications() {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')

  const categories = useMemo(() => {
    return Array.from(new Set(publications.map((item) => item.category).filter(Boolean))).sort()
  }, [])

  const years = useMemo(() => {
    return Array.from(new Set(publications.map((item) => item.year).filter(Boolean))).sort((a, b) => b - a)
  }, [])

  const filtered = useMemo(() => {
    return publications.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false
      if (selectedYear !== 'all' && item.year !== Number(selectedYear)) return false
      if (query) {
        const haystack = `${item.title} ${item.description || ''}`.toLowerCase()
        if (!haystack.includes(query.toLowerCase())) return false
      }
      return true
    })
  }, [query, selectedCategory, selectedYear])

  return (
    <main className="bg-sand-50 text-ink-900">
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
        <p className="section-kicker">CSA&G Press</p>
        <h1 className="section-title text-4xl sm:text-5xl">Publications and Resources</h1>
        <p className="mt-6 max-w-3xl text-lg text-ink-700">
          Explore CSA&G publications, policy briefs, and learning resources across gender justice, HIV, social justice,
          and community wellbeing.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.3fr_0.35fr_0.35fr]">
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-ink-600">Search</label>
            <input
              className="mt-2 w-full rounded-2xl border border-ink-900/10 bg-white px-4 py-3 text-sm"
              placeholder="Search titles or descriptions"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-ink-600">Category</label>
            <select
              className="mt-2 w-full rounded-2xl border border-ink-900/10 bg-white px-4 py-3 text-sm"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              <option value="all">All</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.3em] text-ink-600">Year</label>
            <select
              className="mt-2 w-full rounded-2xl border border-ink-900/10 bg-white px-4 py-3 text-sm"
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
            >
              <option value="all">All</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="mt-6 text-sm text-ink-600">{filtered.length} publications</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-2">
          {filtered.map((item) => (
            <article key={`${item.title}-${item.directDownloadUrl}`} className="rounded-3xl border border-ink-900/10 bg-white p-6 shadow-lift">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-ink-600">
                <span>{item.category || 'Publication'}</span>
                <span>-</span>
                <span>{getYearLabel(item.year)}</span>
              </div>
              <h2 className="mt-4 font-display text-2xl text-ink-950">{item.title}</h2>
              {item.description && <p className="mt-4 text-sm text-ink-700">{item.description}</p>}
              <div className="mt-6 flex flex-wrap gap-3">
                {item.downloadPageUrl && (
                  <a
                    className="rounded-full border border-ink-900/20 px-4 py-2 text-sm font-semibold text-ink-900"
                    href={item.downloadPageUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View page
                  </a>
                )}
                {item.directDownloadUrl && (
                  <a
                    className="rounded-full bg-ink-950 px-4 py-2 text-sm font-semibold text-white"
                    href={item.directDownloadUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Direct download
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="rounded-3xl border border-ink-900/10 bg-white p-10 text-center text-sm text-ink-600">
            No publications match your filters.
          </div>
        )}
      </section>
    </main>
  )
}
