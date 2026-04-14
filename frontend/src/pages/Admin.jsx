import { useState, useEffect } from 'react'
import { api } from '../services/api'

// ── SIMPLE PASSWORD PROTECTION ──
const ADMIN_PASSWORD = 'nexaseed2026'

// ── SHARED STYLES ──
const card = { background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem' }
const inputStyle = { padding: '10px 14px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '13.5px', fontFamily: 'var(--body)', color: 'var(--ink)', background: 'var(--white)', outline: 'none', width: '100%' }
const labelStyle = { fontSize: '10.5px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--ink-3)', fontWeight: 500, display: 'block', marginBottom: '5px' }
const btnSm = { padding: '7px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', border: 'none', fontFamily: 'var(--body)' }

// ── LOGIN SCREEN ──
function Login({ onLogin }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  function handleSubmit(e) {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) { onLogin(); localStorage.setItem('admin_auth', '1') }
    else { setErr('Incorrect password.'); setPw('') }
  }
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ width: '100%', maxWidth: 380, padding: '2.5rem', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '10px' }}>
        <div style={{ fontFamily: 'var(--display)', fontSize: '2rem', fontWeight: 300, color: 'var(--ink)', marginBottom: '0.5rem' }}>Admin Panel</div>
        <p style={{ fontSize: '13px', color: 'var(--ink-4)', marginBottom: '2rem' }}>Shahariar Portfolio CMS</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Password</label>
            <input type="password" value={pw} onChange={e => setPw(e.target.value)} style={inputStyle} placeholder="Enter admin password" required />
          </div>
          {err && <p style={{ fontSize: '12px', color: '#c0392b' }}>{err}</p>}
          <button type="submit" style={{ ...btnSm, padding: '12px', background: 'var(--ink)', color: 'var(--white)', borderRadius: '6px', fontSize: '13.5px' }}>
            Sign In →
          </button>
        </form>
      </div>
    </div>
  )
}

// ── PROJECT FORM ──
function ProjectForm({ initial, onSave, onCancel }) {
  const blank = { title: '', slug: '', shortDesc: '', fullDesc: '', challenge: '', solution: '', outcome: '', category: 'Web App', status: 'Completed', stack: '', liveUrl: '', githubUrl: '', featured: false, order: 0 }
  const [form, setForm] = useState(initial ? { ...initial, stack: initial.stack?.join(', ') } : blank)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      const payload = { ...form, stack: form.stack.split(',').map(s => s.trim()).filter(Boolean), order: Number(form.order) }
      if (!payload.slug) payload.slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      if (initial?._id) await api.updateProject(initial._id, payload)
      else await api.createProject(payload)
      setMsg('Saved!')
      onSave()
    } catch (err) { setMsg('Error: ' + err.message) } finally { setSaving(false) }
  }

  const cats = ['Web App', 'Software', 'UI/UX Design', 'Branding', 'AI / Automation']
  const statuses = ['Live', 'In Progress', 'Completed', 'Case Study']
  const row = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }
  const field = (label, key, type = 'text', opts) => (
    <div>
      <label style={labelStyle}>{label}</label>
      {type === 'select'
        ? <select value={form[key]} onChange={e => set(key, e.target.value)} style={inputStyle}>
            {opts.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        : type === 'textarea'
        ? <textarea value={form[key]} onChange={e => set(key, e.target.value)} style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }} />
        : type === 'checkbox'
        ? <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--ink-2)', cursor: 'pointer' }}>
            <input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)} />
            Featured project
          </label>
        : <input type={type} value={form[key]} onChange={e => set(key, e.target.value)} style={inputStyle} />
      }
    </div>
  )

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={row}>
        {field('Title *', 'title')}
        {field('Slug (auto-generated)', 'slug')}
      </div>
      <div style={row}>
        {field('Category *', 'category', 'select', cats)}
        {field('Status', 'status', 'select', statuses)}
      </div>
      {field('Short Description *', 'shortDesc', 'textarea')}
      {field('Full Description *', 'fullDesc', 'textarea')}
      {field('Challenge', 'challenge', 'textarea')}
      {field('Solution', 'solution', 'textarea')}
      {field('Outcome / Results', 'outcome', 'textarea')}
      {field('Tech Stack (comma separated)', 'stack')}
      <div style={row}>
        {field('Live URL', 'liveUrl')}
        {field('GitHub URL', 'githubUrl')}
      </div>
      <div style={row}>
        {field('Order', 'order', 'number')}
        {field('Featured', 'featured', 'checkbox')}
      </div>
      {msg && <p style={{ fontSize: '12px', color: msg.startsWith('Error') ? '#c0392b' : 'green' }}>{msg}</p>}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button type="submit" disabled={saving} style={{ ...btnSm, background: 'var(--ink)', color: 'var(--white)', padding: '10px 24px' }}>
          {saving ? 'Saving...' : initial ? 'Update Project' : 'Create Project'}
        </button>
        <button type="button" onClick={onCancel} style={{ ...btnSm, background: 'transparent', border: '1px solid var(--border)', color: 'var(--ink-2)', padding: '10px 24px' }}>
          Cancel
        </button>
      </div>
    </form>
  )
}

// ── PROJECTS TAB ──
function ProjectsTab() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // null=list, 'new'=new form, obj=edit form

  async function load() {
    setLoading(true)
    try { const r = await api.getProjects(); setProjects(r.data) } catch (e) { console.error(e) } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id, title) {
    if (!window.confirm(`Delete "${title}"?`)) return
    try { await api.deleteProject(id); load() } catch (e) { alert('Delete failed') }
  }

  if (editing === 'new' || (editing && editing._id)) {
    return (
      <div>
        <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.5rem', fontWeight: 400, marginBottom: '1.5rem', color: 'var(--ink)' }}>
          {editing === 'new' ? 'Add New Project' : `Edit: ${editing.title}`}
        </h3>
        <ProjectForm initial={editing === 'new' ? null : editing} onSave={() => { setEditing(null); load() }} onCancel={() => setEditing(null)} />
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--ink)' }}>Projects ({projects.length})</h3>
        <button onClick={() => setEditing('new')} style={{ ...btnSm, background: 'var(--ink)', color: 'var(--white)', padding: '10px 20px' }}>+ Add Project</button>
      </div>
      {loading ? <p style={{ color: 'var(--ink-4)' }}>Loading...</p> : projects.map(p => (
        <div key={p._id} style={{ ...card, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--display)', fontSize: '1.1rem', fontWeight: 400, color: 'var(--ink)' }}>{p.title}</div>
            <div style={{ fontSize: '11px', color: 'var(--ink-4)', marginTop: '3px', letterSpacing: '1px', textTransform: 'uppercase' }}>{p.category} · {p.status} {p.featured ? '· ⭐ Featured' : ''}</div>
            <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '4px' }}>{p.shortDesc?.slice(0, 80)}...</div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
            <button onClick={() => setEditing(p)} style={{ ...btnSm, background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--ink-2)' }}>Edit</button>
            <button onClick={() => handleDelete(p._id, p.title)} style={{ ...btnSm, background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── SERVICES TAB ──
function ServicesTab() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ icon: '◈', title: '', shortDesc: '', features: '', forWho: '', order: 0 })
  const [msg, setMsg] = useState('')

  async function load() {
    setLoading(true)
    try { const r = await api.getServices(); setServices(r.data) } catch (e) {} finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  async function handleCreate(e) {
    e.preventDefault()
    try {
      const payload = { ...form, features: form.features.split(',').map(s => s.trim()).filter(Boolean), order: Number(form.order) }
      await api.createService(payload)
      setMsg('Service added!')
      setShowForm(false)
      setForm({ icon: '◈', title: '', shortDesc: '', features: '', forWho: '', order: 0 })
      load()
    } catch (err) { setMsg('Error: ' + err.message) }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--ink)' }}>Services ({services.length})</h3>
        <button onClick={() => setShowForm(!showForm)} style={{ ...btnSm, background: 'var(--ink)', color: 'var(--white)', padding: '10px 20px' }}>+ Add Service</button>
      </div>

      {showForm && (
        <div style={{ ...card, marginBottom: '2rem' }}>
          <h4 style={{ fontFamily: 'var(--display)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--ink)', marginBottom: '1rem' }}>New Service</h4>
          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '0.75rem' }}>
              <div><label style={labelStyle}>Icon</label><input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} style={inputStyle} /></div>
              <div><label style={labelStyle}>Title *</label><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={inputStyle} required /></div>
            </div>
            <div><label style={labelStyle}>Short Description *</label><textarea value={form.shortDesc} onChange={e => setForm(f => ({ ...f, shortDesc: e.target.value }))} style={{ ...inputStyle, minHeight: 70, resize: 'vertical' }} required /></div>
            <div><label style={labelStyle}>Features (comma separated)</label><input value={form.features} onChange={e => setForm(f => ({ ...f, features: e.target.value }))} style={inputStyle} placeholder="Feature 1, Feature 2, Feature 3" /></div>
            <div><label style={labelStyle}>Who is it for?</label><input value={form.forWho} onChange={e => setForm(f => ({ ...f, forWho: e.target.value }))} style={inputStyle} /></div>
            <div><label style={labelStyle}>Order</label><input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: e.target.value }))} style={{ ...inputStyle, width: 80 }} /></div>
            {msg && <p style={{ fontSize: '12px', color: msg.startsWith('Error') ? '#c0392b' : 'green' }}>{msg}</p>}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="submit" style={{ ...btnSm, background: 'var(--ink)', color: 'var(--white)', padding: '10px 20px' }}>Save Service</button>
              <button type="button" onClick={() => setShowForm(false)} style={{ ...btnSm, background: 'transparent', border: '1px solid var(--border)', color: 'var(--ink-2)', padding: '10px 20px' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <p style={{ color: 'var(--ink-4)' }}>Loading...</p> : services.map(s => (
        <div key={s._id} style={{ ...card, display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '1.5rem', width: 40, textAlign: 'center', color: 'var(--ink-4)' }}>{s.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--display)', fontSize: '1.1rem', color: 'var(--ink)' }}>{s.title}</div>
            <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '3px' }}>{s.shortDesc?.slice(0, 80)}</div>
            {s.features?.length > 0 && <div style={{ fontSize: '11px', color: 'var(--ink-4)', marginTop: '4px' }}>{s.features.join(' · ')}</div>}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--ink-4)', letterSpacing: '1px' }}>Order: {s.order}</div>
        </div>
      ))}
    </div>
  )
}

// ── TESTIMONIALS TAB ──
function TestimonialsTab() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const r = await fetch(`${BASE}/testimonials/all`)
      const data = await r.json()
      setTestimonials(data.data)
    } catch (e) {} finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  async function updateStatus(id, status) {
    try {
      const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      await fetch(`${BASE}/testimonials/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      load()
    } catch (e) { alert('Failed to update') }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this review?')) return
    try {
      const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      await fetch(`${BASE}/testimonials/${id}`, { method: 'DELETE' })
      load()
    } catch (e) { alert('Delete failed') }
  }

  const statusColor = { pending: '#f59e0b', approved: '#16a34a', rejected: '#dc2626' }

  return (
    <div>
      <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--ink)', marginBottom: '1.5rem' }}>
        Reviews ({testimonials.length})
      </h3>
      {loading ? <p style={{ color: 'var(--ink-4)' }}>Loading...</p> : testimonials.map(t => (
        <div key={t._id} style={{ ...card }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 500, fontSize: '14px', color: 'var(--ink)' }}>{t.name}</span>
                {t.company && <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>{t.company}</span>}
                <span style={{ fontSize: '12px', color: statusColor[t.status], fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{t.status}</span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--ink-4)', marginBottom: '0.5rem' }}>{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
              <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.6, fontStyle: 'italic' }}>"{t.feedback}"</p>
              <div style={{ fontSize: '11px', color: 'var(--ink-4)', marginTop: '0.5rem' }}>{new Date(t.createdAt).toLocaleDateString()}</div>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {t.status !== 'approved' && <button onClick={() => updateStatus(t._id, 'approved')} style={{ ...btnSm, background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a' }}>✓ Approve</button>}
              {t.status !== 'rejected' && <button onClick={() => updateStatus(t._id, 'rejected')} style={{ ...btnSm, background: '#fff7ed', border: '1px solid #fed7aa', color: '#ea580c' }}>Reject</button>}
              <button onClick={() => handleDelete(t._id)} style={{ ...btnSm, background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── MESSAGES TAB ──
function MessagesTab() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    fetch(`${BASE}/contact`)
      .then(r => r.json())
      .then(d => setMessages(d.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h3 style={{ fontFamily: 'var(--display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--ink)', marginBottom: '1.5rem' }}>
        Contact Messages ({messages.length})
      </h3>
      {loading ? <p style={{ color: 'var(--ink-4)' }}>Loading...</p> : messages.length === 0 ? (
        <p style={{ color: 'var(--ink-4)', fontSize: '14px' }}>No messages yet.</p>
      ) : messages.map(m => (
        <div key={m._id} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <span style={{ fontWeight: 500, fontSize: '14px', color: 'var(--ink)' }}>{m.name}</span>
              <span style={{ fontSize: '12px', color: 'var(--ink-4)', marginLeft: '0.75rem' }}>{m.email}</span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--ink-4)' }}>{new Date(m.createdAt).toLocaleDateString()}</span>
          </div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-2)', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>{m.subject}</div>
          <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.7 }}>{m.message}</p>
          <a href={`mailto:${m.email}?subject=Re: ${m.subject}`} style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '12px', color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--border)', paddingBottom: '1px' }}>
            Reply via Email →
          </a>
        </div>
      ))}
    </div>
  )
}

// ── MAIN ADMIN ──
export default function Admin() {
  const [authed, setAuthed] = useState(localStorage.getItem('admin_auth') === '1')
  const [tab, setTab] = useState('projects')

  if (!authed) return <Login onLogin={() => setAuthed(true)} />

  const tabs = [
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'messages', label: 'Messages' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Admin navbar */}
      <div style={{ background: 'var(--ink)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'var(--display)', fontSize: '1.3rem', fontWeight: 300, color: 'var(--white)' }}>
          Admin Panel <em style={{ fontStyle: 'italic', color: 'var(--ink-3)', fontSize: '1rem' }}>— Shahariar Portfolio</em>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href="/" target="_blank" style={{ fontSize: '12px', color: 'var(--ink-4)', textDecoration: 'none' }}>View Site ↗</a>
          <button onClick={() => { localStorage.removeItem('admin_auth'); setAuthed(false) }} style={{ ...btnSm, background: 'transparent', border: '1px solid var(--border-dark)', color: 'var(--ink-4)' }}>
            Sign Out
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)', padding: '0 2rem', display: 'flex', gap: '0' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '1rem 1.5rem', background: 'none', border: 'none', borderBottom: tab === t.id ? '2px solid var(--ink)' : '2px solid transparent', fontSize: '13px', fontWeight: tab === t.id ? 600 : 400, color: tab === t.id ? 'var(--ink)' : 'var(--ink-3)', cursor: 'pointer', fontFamily: 'var(--body)', transition: 'all 0.15s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
        {tab === 'projects' && <ProjectsTab />}
        {tab === 'services' && <ServicesTab />}
        {tab === 'reviews' && <TestimonialsTab />}
        {tab === 'messages' && <MessagesTab />}
      </div>
    </div>
  )
}
