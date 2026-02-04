const themes = [
  'Social and community justice',
  'Gender-based justice',
  'Institutional and social transformation',
  'Sexual and reproductive health and rights',
  'Sexual diversity and sexual citizenship',
  'The challenges and dynamics of gender, identity, race and class',
  'Personal and social leadership for active citizenship and political accountability',
  'Meaningful community engagement and the promotion of community wellness',
]

export default function About() {
  return (
    <main className="bg-sand-50 text-ink-900">
      <section className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
        <p className="section-kicker">About the CSA&G</p>
        <h1 className="section-title text-4xl sm:text-5xl">
          About the Centre for Sexualities, AIDS and Gender
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 text-ink-700">
            <div>
              <h2 className="font-display text-2xl text-ink-950">Vision</h2>
              <p className="mt-3 text-lg italic">
                “Understanding power, exploring diversity and enabling inclusivity”
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-ink-950">Mission</h2>
              <p className="mt-3">
                CSA&G recognises that a strategic and context-driven set of intervention strategies and research
                activities on sexualities, AIDS and gender must engage with individual behaviour dynamics, social and
                meaning processes, and structural enablers and barriers, to have the greatest impact.
              </p>
              <p className="mt-4">
                The CSA&G views gender and sexualities as key to debates and practices around an inclusive sexual
                citizenship, in an open society, in the context of an emerging democracy with greater calls for
                accountability and active citizenship.
              </p>
            </div>
          </div>
          <div className="glass-panel rounded-3xl p-6">
            <h3 className="font-display text-xl text-ink-950">Key themes</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-800">
              {themes.map((theme) => (
                <li key={theme} className="rounded-2xl border border-ink-900/10 bg-white px-4 py-3">
                  {theme}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 space-y-6 text-ink-700">
          <p>
            The Centre for Sexualities, AIDS and Gender (CSA&G) was established in 1999 as the Centre for the Study of
            AIDS (CSA). In its early years, the Centre was a standalone organisation that guided and shaped the
            University of Pretoria’s (UP) HIV response. The centre engaged with the communities from which staff and
            students are drawn, and implemented both service and research programmes. The CSA&G situates its work in
            both theory and practice.
          </p>
          <p>
            The Centre is now based within UP’s Faculty of Humanities, but works across all nine UP faculties and
            professional services.
          </p>
          <p>
            The CSA&G uses an intersectional approach to working with constituents around broader issues of human
            rights and social justice.
          </p>
          <p>
            The CSA&G mostly funds its own work and continues to collaborate and work with local and international
            governments, donors, development agencies and civil society – developing a reputation for innovative
            thinking and work that is strengthened by organisational integrity.
          </p>
          <p>
            The CSA&G’s work is guided by an institutional reference group comprised of representatives from most UP
            faculties, professional services and the Executive.
          </p>
        </div>
      </section>
    </main>
  )
}
