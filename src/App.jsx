import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import GenericPage from './pages/GenericPage.jsx'
import About from './pages/About.jsx'
import History from './pages/History.jsx'
import Team from './pages/Team.jsx'
import Sage from './pages/Sage.jsx'
import News from './pages/News.jsx'
import Publications from './pages/Publications.jsx'
import JustLeadership from './pages/JustLeadership.jsx'
import CoreHgs from './pages/CoreHgs.jsx'
import GbvSocialJustice from './pages/GbvSocialJustice.jsx'
import Changemakers from './pages/Changemakers.jsx'
import Cse from './pages/Cse.jsx'
import WorkingWithYoungPeople from './pages/WorkingWithYoungPeople.jsx'
import { routePages } from './pages/pageData.js'

const navTree = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Our Story',
    to: '/our-story',
    children: [
      { label: 'About the CSA&G', to: '/about' },
      { label: 'Short Organisational History', to: '/history' },
      { label: 'Our Team', to: '/team' },
      { label: 'SAGE@UP', to: '/sage-up' },
      { label: 'News / Articles', to: '/news' },
    ],
  },
  {
    label: 'Working with Young People',
    to: '/working-with-young-people',
  },
  {
    label: 'Key Projects',
    to: '/key-projects',
    children: [
      { label: 'Just Leadership', to: '/projects/just-leadership' },
      {
        label: 'Africa-Europe Cluster of Research Excellence in Health, Gender and Sexualities',
        to: '/projects/africa-europe-core-hgs',
      },
      { label: 'GBV & Social Justice', to: '/projects/gbv-social-justice' },
      { label: 'Gender Equality Changemakers Programme', to: '/projects/gender-equality-changemakers' },
      { label: 'Just Comprehensive Sexualities Education (CSE)', to: '/projects/cse' },
    ],
  },
  {
    label: 'Publications and Resources',
    to: '/publications',
  },
  {
    label: 'Contact',
    to: '/contact',
  },
  {
    label: 'Search',
    to: '/search',
  },
]

function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-sand-50 text-ink-900">
      <header className="sticky top-0 z-40 border-b border-ink-900/10 bg-white/80 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink-950 text-sm font-semibold text-white">
              CSA&G
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-ink-500">Centre for</p>
              <p className="font-display text-base text-ink-950">Sexualities, AIDS & Gender</p>
            </div>
          </NavLink>
          <div className="hidden items-center gap-6 text-sm lg:flex">
            {navTree.map((item) =>
              item.children ? (
                <div key={item.label} className="group relative">
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `transition ${isActive ? 'text-ink-950' : 'text-ink-600 hover:text-ink-950'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                  <div className="pointer-events-none absolute left-0 top-full mt-2 w-80 opacity-0 transition group-hover:pointer-events-auto group-hover:opacity-100">
                    <div className="relative rounded-2xl border border-ink-900/10 bg-white p-4 shadow-lift before:absolute before:-top-3 before:left-0 before:h-3 before:w-full before:content-['']">
                      <p className="mb-3 text-xs uppercase tracking-[0.3em] text-ink-600">{item.label}</p>
                      <div className="grid gap-2">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.label}
                            to={child.to}
                            className="rounded-xl px-3 py-2 text-sm text-ink-700 transition hover:bg-white hover:text-ink-950"
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `transition ${isActive ? 'text-ink-950' : 'text-ink-600 hover:text-ink-950'}`
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-full border border-ink-900/20 px-4 py-2 text-sm lg:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            Menu
          </button>
        </nav>

        {menuOpen && (
          <div className="mx-auto w-full max-w-6xl px-6 pb-6 lg:hidden">
            <div className="glass-panel rounded-3xl p-6 text-ink-900">
              <div className="grid gap-5 text-sm">
                {navTree.map((item) => (
                  <div key={item.label} className="space-y-3">
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className="font-semibold text-ink-900"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                    {item.children && (
                      <div className="grid gap-2 pl-4 text-ink-700">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.label}
                            to={child.to}
                            className="hover:text-ink-950"
                            onClick={() => setMenuOpen(false)}
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route path="/team" element={<Team />} />
        <Route path="/sage-up" element={<Sage />} />
        <Route path="/news" element={<News />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/projects/just-leadership" element={<JustLeadership />} />
        <Route path="/projects/africa-europe-core-hgs" element={<CoreHgs />} />
        <Route path="/projects/gbv-social-justice" element={<GbvSocialJustice />} />
        <Route path="/projects/gender-equality-changemakers" element={<Changemakers />} />
        <Route path="/projects/cse" element={<Cse />} />
        <Route path="/working-with-young-people" element={<WorkingWithYoungPeople />} />
        {routePages.map((page) => {
          if (page.path === '/our-story') {
            return <Route key={page.path} path={page.path} element={<Navigate to="/about" replace />} />
          }
          if (page.path === '/projects/just-leadership') {
            return null
          }
          if (page.path === '/projects/africa-europe-core-hgs') {
            return null
          }
          if (page.path === '/projects/gbv-social-justice') {
            return null
          }
          if (page.path === '/projects/gender-equality-changemakers') {
            return null
          }
          if (page.path === '/projects/cse') {
            return null
          }
          if (page.path === '/working-with-young-people') {
            return null
          }
          return (
            <Route
              key={page.path}
              path={page.path}
              element={<GenericPage title={page.title} description={page.description} sections={page.sections} />}
            />
          )
        })}
        <Route path="*" element={<GenericPage title="Page not found" description="Sorry, this page does not exist." />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteLayout />
    </BrowserRouter>
  )
}
