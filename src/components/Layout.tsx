import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { groups, topicsByGroup } from '../content/registry'

export default function Layout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Tanca el menú en navegar (mòbil).
  function close() {
    setOpen(false)
  }

  return (
    <div className="app">
      <header className="topbar">
        <button className="hamburger" onClick={() => setOpen((o) => !o)} aria-label="Menú">☰</button>
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-mark">ADA</span>
          <span className="brand-sub">Anàlisi i Disseny d'Aplicacions</span>
        </Link>
        <NavLink to="/flashcards" className="topbar-link" onClick={close}>
          🃏 Flashcards
        </NavLink>
      </header>

      <div className="body">
        <aside className={`sidebar ${open ? 'open' : ''}`}>
          <nav>
            <NavLink to="/" end className="nav-home" onClick={close}>
              🏠 Inici
            </NavLink>
            {groups.map((g) => (
              <div className="nav-group" key={g.id}>
                <div className="nav-group-title">{g.title}</div>
                {topicsByGroup(g.id).map((t) => (
                  <NavLink key={t.id} to={`/tema/${t.id}`} className="nav-link" onClick={close}>
                    <span className="nav-emoji">{t.emoji}</span>
                    {t.short}
                  </NavLink>
                ))}
              </div>
            ))}
            <div className="nav-group">
              <div className="nav-group-title">Estudi</div>
              <NavLink to="/flashcards" className="nav-link" onClick={close}>
                <span className="nav-emoji">🃏</span>
                Flashcards
              </NavLink>
            </div>
          </nav>
          <div className="sidebar-foot">
            Material del curs ADA · URV<br />
            Resum d'estudi en català
          </div>
        </aside>

        {open && <div className="backdrop" onClick={close} />}

        <main className="content" key={location.pathname}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
