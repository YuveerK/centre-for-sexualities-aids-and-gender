export default function GenericPage({ title, description, sections = [] }) {
  return (
    <main className="bg-sand-50 text-ink-900">
      <section className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
        <p className="section-kicker">CSA&G</p>
        <h1 className="section-title text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-700">
          {description || 'Content for this page will be added next.'}
        </p>
        {sections.length > 0 && (
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {sections.map((item) => (
              <div key={item} className="glass-panel rounded-3xl p-6">
                <p className="text-sm text-ink-800">{item}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
