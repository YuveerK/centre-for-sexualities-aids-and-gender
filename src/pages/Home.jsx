import { Link } from "react-router-dom";

const heroImages = [
  {
    src: "https://www.csagup.org/wp-content/uploads/2022/08/Akanyang.jpg",
    alt: "Akanyang Building",
    caption: "Situated in Akanyang at UP",
  },
  {
    src: "https://www.csagup.org/wp-content/uploads/2022/08/b2.jpg",
    alt: "CSA&G publications",
    caption: "Selected publications and stories",
  },
];

const quickActions = [
  {
    title: "Our Story",
    text: "History, people, and the CSA&G journey",
    cta: "Read More",
    to: "/our-story",
  },
  {
    title: "Working with Young People",
    text: "Youth-centred engagement for social justice",
    cta: "Read More",
    to: "/working-with-young-people",
  },
  {
    title: "Key Projects",
    text: "Flagship initiatives advancing equity",
    cta: "Read More",
    to: "/key-projects",
  },
  {
    title: "Publications",
    text: "Research outputs and learning tools",
    cta: "Browse",
    to: "/publications",
  },
];

const signaturePrograms = [
  {
    title: "Just Leadership",
    text: "A flagship volunteer and leadership development programme building a movement of active citizen student leaders.",
  },
  {
    title: "Africa-Europe CoRE HGS",
    text: "Interdisciplinary research cluster advancing evidence-based policy and equitable collaboration in health, gender, and sexualities.",
  },
  {
    title: "GBV & Social Justice",
    text: "A five-year collaborative programme supporting partners to strengthen evidence-based practice and inclusive advocacy.",
  },
  {
    title: "Gender Equality Changemakers",
    text: "A professional certification pathway equipping gender equity change agents with applied leadership and organisational skills.",
  },
];

const selectedPublications = [
  {
    title:
      "(Un)knowing MEN: Africanising gender justice programmes for men in South Africa",
    meta: "2018 · CSA&G Press",
  },
  {
    title:
      "Women in the Context of Justice: Continuities and Discontinuities in Southern Africa",
    meta: "2018 · CSA&G Press",
  },
  {
    title:
      "Integrating HIV and AIDS into the curriculum at the University of Pretoria: Time for transformation?",
    meta: "2016 · CSA&G",
  },
];

const newsItems = [
  {
    title: "Call for Applications: Early-Career Research Exchange",
    date: "15 September 2025",
    tag: "CSA&G",
  },
  {
    title: "Call for Short Stories: (Non)Consent in Our Lives",
    date: "28 March 2025",
    tag: "Just Leaders",
  },
  {
    title:
      "From Washington to Pretoria and Beyond: Building Local Responses to US Attacks on SOGIESC Minorities’ Rights and Health Services",
    date: "27 March 2025",
    tag: "CSA&G",
  },
  {
    title:
      "Call for Applications: One-Year International Research and Advocacy Exchange",
    date: "18 November 2024",
    tag: "CSA&G",
  },
];

const metrics = [
  { label: "Founded", value: "1999" },
  { label: "Active projects", value: "25+" },
  { label: "Partner universities", value: "10+" },
  { label: "Publications", value: "150+" },
];

const impactAreas = [
  "Social and community justice",
  "Gender-based justice",
  "Sexual & reproductive health",
  "Sexual diversity & citizenship",
  "Leadership for active citizenship",
  "Community engagement & wellness",
];

export default function Home() {
  return (
    <div className="bg-sand-50 text-ink-900">
      <header className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0 bg-hero-grid bg-[length:32px_32px] opacity-60" />
        <div className="absolute inset-0 bg-sunset-gradient opacity-80" />
        <div className="absolute -left-24 top-10 h-56 w-56 rounded-full bg-gold-500/35 blur-3xl" />
        <div className="absolute -right-28 bottom-0 h-72 w-72 rounded-full bg-coral-400/30 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-6 pb-24 pt-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.3em] text-white">
              Centre for Sexualities, AIDS & Gender
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Power, diversity, and inclusive citizenship.
            </h1>
            <p className="max-w-xl text-lg text-white/80">
              The CSA&G is a University of Pretoria centre advancing evidence,
              practice, and policy across gender, sexualities, HIV, and social
              justice. We collaborate locally and globally to shape safer,
              fairer futures.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/our-story"
                className="rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-ink-950 shadow-glow"
              >
                Explore our work
              </Link>
              <Link
                to="/publications"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white"
              >
                Download publications
              </Link>
            </div>
            <div className="grid gap-4 pt-2 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/20 bg-white/5 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            {heroImages.map((image) => (
              <div
                key={image.src}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lift"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-52 w-full object-cover"
                  loading="lazy"
                />
                <div className="px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Featured
                  </p>
                  <p className="mt-2 text-sm text-white/80">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-6xl px-6 py-16 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-4">
          {quickActions.map((action) => (
            <div
              key={action.title}
              className="rounded-3xl border border-ink-900/10 bg-white p-6 shadow-lift"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink-950 text-xs font-semibold text-white">
                CSA
              </div>
              <h3 className="mt-6 font-display text-xl text-ink-950">
                {action.title}
              </h3>
              <p className="mt-3 text-sm text-ink-700">{action.text}</p>
              <Link
                to={action.to}
                className="mt-6 inline-flex text-sm font-semibold text-ink-950"
              >
                {action.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
          <div className="space-y-6">
            <p className="section-kicker">Vision</p>
            <h2 className="section-title">
              Understanding power, exploring diversity, enabling inclusivity.
            </h2>
            <p className="text-ink-700">
              We advance research and practice that engage individual behaviour,
              social meaning, and structural enablers and barriers. Our work
              supports inclusive sexual citizenship and active accountability.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {impactAreas.map((theme) => (
                <div
                  key={theme}
                  className="rounded-2xl border border-ink-900/10 bg-sand-50 p-4 text-sm"
                >
                  {theme}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-ink-900/10 bg-sand-50 p-8">
            <p className="section-kicker">Signature programmes</p>
            <div className="mt-6 space-y-5">
              {signaturePrograms.map((program) => (
                <div
                  key={program.title}
                  className="rounded-2xl border border-ink-900/10 bg-white p-5"
                >
                  <p className="font-semibold text-ink-950">{program.title}</p>
                  <p className="mt-2 text-sm text-ink-700">{program.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand-100">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <p className="section-kicker">Publications</p>
              <h2 className="section-title">
                CSA&G Press and knowledge products
              </h2>
              <p className="text-ink-700">
                Peer-reviewed and practice-oriented outputs that shape policy,
                programmes, and public understanding across gender, sexualities,
                and social justice.
              </p>
              <Link
                to="/publications"
                className="rounded-full bg-ink-950 px-6 py-3 text-sm font-semibold text-white"
              >
                Browse catalogue
              </Link>
            </div>
            <div className="space-y-4">
              {selectedPublications.map((pub) => (
                <div
                  key={pub.title}
                  className="rounded-3xl border border-ink-900/10 bg-white p-6 shadow-lift"
                >
                  <p className="font-semibold text-ink-950">{pub.title}</p>
                  <p className="text-sm text-ink-700">{pub.meta}</p>
                  <Link
                    to="/publications"
                    className="mt-4 inline-flex text-sm font-semibold text-ink-950"
                  >
                    Download
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="section-kicker">News, Views & Events</p>
              <h2 className="section-title">Latest updates from CSA&G</h2>
            </div>
            <Link
              to="/news"
              className="rounded-full border border-ink-900/20 px-5 py-2 text-sm font-semibold text-ink-900"
            >
              View archive
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {newsItems.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-ink-900/10 bg-sand-50 p-6 shadow-lift"
              >
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-ink-700">
                  <span>{item.tag}</span>
                  <span>-</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="mt-4 font-display text-xl text-ink-950">
                  {item.title}
                </h3>
                <Link
                  to="/news"
                  className="mt-6 inline-flex text-sm font-semibold text-ink-950"
                >
                  Read more
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-3xl border border-ink-900/10 bg-white p-6">
            <div className="fade-edge overflow-hidden">
              <div className="flex w-[200%] animate-marquee gap-6 text-sm text-ink-700">
                {[...newsItems, ...newsItems].map((item, index) => (
                  <span
                    key={`${item.title}-${index}`}
                    className="whitespace-nowrap"
                  >
                    {item.date} - {item.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-950 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
          <div className="space-y-6">
            <p className="section-kicker text-white/70">Connect</p>
            <h2 className="section-title text-white">
              Partner with the centre
            </h2>
            <p className="text-white/70">
              Akanyang Building (formerly Huis & Haard)
              <br />
              UP Hatfield Campus
              <br />
              Tel: +27 12 420 4391
              <br />
              info@csagup.org
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              {[
                { label: "Facebook", href: "https://www.facebook.com" },
                { label: "X", href: "https://x.com" },
                { label: "YouTube", href: "https://www.youtube.com" },
                { label: "Instagram", href: "https://www.instagram.com" },
                { label: "Soundcloud", href: "https://soundcloud.com" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/30 px-4 py-2 text-white/80 hover:border-white hover:text-white"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="font-display text-2xl text-white">Send a message</h3>
            <div className="mt-6 grid gap-4">
              {["Your Name", "Your Email", "Subject"].map((label) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/80"
                >
                  {label}
                </div>
              ))}
              <div className="h-24 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/80">
                Your Message
              </div>
              <a
                href="mailto:info@csagup.org"
                className="inline-flex rounded-full bg-gold-500 px-5 py-3 text-sm font-semibold text-ink-950"
              >
                Submit message
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
