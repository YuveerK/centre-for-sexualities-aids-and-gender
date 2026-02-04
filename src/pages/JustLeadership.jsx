export default function JustLeadership() {
  return (
    <main className="bg-sand-50 text-ink-900">
      <section className="mx-auto max-w-5xl px-6 py-20 lg:px-10">
        <p className="section-kicker">Key Projects</p>
        <h1 className="section-title text-4xl sm:text-5xl">Just Leadership</h1>

        <div className="just-leadership-content">
          <div className="just-leadership-intro">
            <img
              src="https://www.csagup.org/wp-content/uploads/2018/07/01-e1531284946776.png"
              alt="Just Leaders Logo"
              width="150"
              height="58"
              className="just-leaders-logo"
              loading="lazy"
            />

            <p>
              <em>Just Leaders</em> is a flagship CSA&G volunteer and leadership development programme. The programme
              evolved from the CSA&G's previous Future Leaders @ Work programme and endeavours to build a movement of
              active citizen student leaders that promote social justice, critical consciousness and inclusive
              practices at the University of Pretoria and supporting similar movements at partner universities in the
              region.
            </p>

            <p>
              <em>Just Leaders'</em> theory of change is:{' '}
              <strong>
                "Through promoting social justice, critical consciousness and inclusive practices, we will co-create
                university environments that are responsive and transformed by just leaders."
              </strong>
            </p>
          </div>

          <div className="just-leadership-focus">
            <h2>Key Focus Areas</h2>
            <ul>
              <li>Conducting and disseminating research that contributes to more inclusive societies and university spaces</li>
              <li>Ensuring the inclusion of marginalised groups and identities is improved</li>
              <li>
                Developing just leaders that build stronger socially just communities and improve access to inclusive
                university environments
              </li>
            </ul>
          </div>

          <div className="just-leadership-social">
            <p>
              <em>Just Leaders</em> is available on:
            </p>
            <div className="just-leadership-links">
              <a href="https://www.facebook.com/justleadersUP/" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              <span aria-hidden="true">|</span>
              <a href="https://twitter.com/justleadersUP" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </div>
          </div>

          <div className="just-leadership-components" id="just-leadership-components">
            <h2>
              <em>Just Leadership</em> is made up of five project components (click on the red circles below for more
              information):
            </h2>
          </div>

          <div className="just-leadership-map">
            <img
              src="https://www.csagup.org/wp-content/uploads/2018/04/Just-Leadership-1.png"
              alt="Just Leadership Map"
              className="just-leadership-map-image"
              loading="lazy"
            />

            <a
              className="map-pin"
              data-location="Research"
              href="#just-leadership-components"
              style={{ top: '9.39%', left: '49.57%' }}
            />
            <a
              className="map-pin"
              data-location="Advocacy"
              href="#just-leadership-components"
              style={{ top: '33.67%', left: '83.25%' }}
            />
            <a
              className="map-pin"
              data-location="Support"
              href="#just-leadership-components"
              style={{ top: '74.15%', left: '71.18%' }}
            />
            <a
              className="map-pin"
              data-location="Regional"
              href="#just-leadership-components"
              style={{ top: '73.91%', left: '30.49%' }}
            />
            <a
              className="map-pin"
              data-location="Community"
              href="#just-leadership-components"
              style={{ top: '32.48%', left: '15.83%' }}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
