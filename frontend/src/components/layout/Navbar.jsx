import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/services', label: 'Services' },
  { to: '/designs', label: 'Designs' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <nav className="nav">
        <Link to="/" className="nav-logo">SR</Link>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end} className={({ isActive }) => isActive ? 'active' : ''}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Link to="/contact" className="nav-cta">Get in touch</Link>
        <button className="mobile-btn" onClick={() => setOpen(!open)} aria-label="Menu">
          <span style={{ transform: open ? 'rotate(45deg) translateY(6.5px)' : '' }} />
          <span style={{ opacity: open ? 0 : 1 }} />
          <span style={{ transform: open ? 'rotate(-45deg) translateY(-6.5px)' : '' }} />
        </button>
      </nav>
      {open && (
        <div style={{ position:'fixed', top:60, left:0, right:0, background:'rgba(247,247,245,0.98)', backdropFilter:'blur(20px)', borderBottom:'1px solid var(--border)', padding:'1.5rem', zIndex:199, display:'flex', flexDirection:'column', gap:'0.25rem' }}>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setOpen(false)}
              style={{ padding:'0.9rem 0', borderBottom:'1px solid var(--border)', textDecoration:'none', fontSize:'15px', color:'var(--ink-2)' }}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} style={{ marginTop:'1rem', padding:'12px 24px', background:'var(--ink)', color:'var(--white)', borderRadius:'100px', fontSize:'13px', fontWeight:500, textDecoration:'none', textAlign:'center' }}>
            Get in touch
          </Link>
        </div>
      )}
    </>
  )
}