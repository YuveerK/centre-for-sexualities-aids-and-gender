const teamMembers = [
  {
    name: 'Chris Joubert',
    href: 'https://www.csagup.org/portfolio-item/chris-joubert/',
    image: 'https://www.csagup.org/wp-content/uploads/2018/04/Chris-260x185.jpg',
  },
  {
    name: 'Christi Kruger',
    href: 'https://www.csagup.org/portfolio-item/christi-kruger/',
    image: 'https://www.csagup.org/wp-content/uploads/2018/05/Christi-4-edit-260x185.jpg',
  },
  {
    name: 'Dipontseng Tsolo',
    href: 'https://www.csagup.org/portfolio-item/dipontseng-kheo/',
    image: 'https://www.csagup.org/wp-content/uploads/2018/05/WhatsApp-Image-2024-06-03-at-11.31.58-260x185.jpeg',
  },
  {
    name: 'Mary Crewe',
    href: 'https://www.csagup.org/portfolio-item/mary-crewe/',
    image: 'https://www.csagup.org/wp-content/uploads/2021/09/Mary_Crewe-bw-260x185.jpg',
  },
  {
    name: 'Pierre Brouard',
    href: 'https://www.csagup.org/portfolio-item/pierre-brouard/',
    image: 'https://www.csagup.org/wp-content/uploads/2018/04/Pierre-260x185.jpg',
  },
  {
    name: 'Shalate Belinda Pakati',
    href: 'https://www.csagup.org/portfolio-item/shalate-belinda-pakati/',
    image: 'https://www.csagup.org/wp-content/uploads/2018/04/Shalate-260x185.jpg',
  },
  {
    name: 'Pfarelo Matsila',
    href: 'https://www.csagup.org/portfolio-item/pfarelo-matsila/',
    image: 'https://www.csagup.org/wp-content/uploads/2021/07/Pfarelo-bw-260x185.jpg',
  },
  {
    name: 'Yanga Ludidi',
    href: 'https://www.csagup.org/portfolio-item/yanga-ludidi/',
    image: 'https://www.csagup.org/wp-content/uploads/2024/10/Yanga-edit-260x185.jpg',
  },
  {
    name: 'KL Dunkle',
    href: 'https://www.csagup.org/portfolio-item/kl-dunkle/',
    image:
      'https://www.csagup.org/wp-content/uploads/2025/08/Dunkle-Headshot-RAH-Dark-Background-IMG_2038-2-260x185.jpg',
  },
]

export default function Team() {
  return (
    <main className="bg-sand-50 text-ink-900">
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
        <p className="section-kicker">Our Team</p>
        <h1 className="section-title text-4xl sm:text-5xl">Meet the CSA&G team</h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-700">
          The Centre brings together a multidisciplinary team dedicated to research, community engagement, and social
          justice.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <a
              key={member.name}
              href={member.href}
              target="_blank"
              rel="noreferrer"
              className="group overflow-hidden rounded-3xl border border-ink-900/10 bg-white shadow-lift transition hover:-translate-y-1"
            >
              <div className="relative h-44 w-full overflow-hidden bg-ink-900/5">
                <img src={member.image} alt={member.name} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg text-ink-950">{member.name}</h3>
                <p className="mt-1 text-sm text-ink-600">View profile</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
