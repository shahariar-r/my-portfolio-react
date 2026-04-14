import { useState } from 'react'
import { useReveal } from '../hooks'
import { api } from '../services/api'

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  useReveal()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await api.submitContact(form)
      setStatus('success')
      setForm({ name:'', email:'', subject:'', message:'' })
    } catch { setStatus('error') } finally { setLoading(false) }
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="label">Get In Touch</div>
          <h1 className="heading">Let's build something<br /><em>great together</em></h1>
          <div className="divider" />
          <p style={{ fontSize:'1rem', color:'var(--ink-3)', fontWeight:300, lineHeight:1.8 }}>Open to freelance projects, full-time roles, and creative collaborations.</p>
        </div>
      </div>
      <section className="section">
        <div className="section-inner contact-grid">
          <div>
            <div className="label reveal">Contact Details</div>
            <h2 className="heading reveal" style={{ fontSize:'clamp(1.8rem,3vw,2.5rem)' }}>Reach out<br /><em>directly</em></h2>
            <div className="divider reveal" />
            <ul className="contact-list reveal">
              {[
                ['Email','hello@shahariar.com','mailto:hello@shahariar.com'],
                ['Location','Canterbury, Kent, England',null],
                ['LinkedIn','linkedin.com/in/shahariar','https://linkedin.com/in/shahariar'],
                ['GitHub','github.com/shahariar-r','https://github.com/shahariar-r'],
                ['Behance','behance.net/shahriar880','https://behance.net/shahriar880'],
                ['Company','NexaSeed · Founder & CEO',null],
              ].map(([l,v,href]) => (
                <li key={l}>
                  <span className="contact-lbl">{l}</span>
                  {href ? <a href={href} target="_blank" rel="noreferrer" className="contact-val">{v}</a> : <span className="contact-val">{v}</span>}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            {status === 'success' ? (
              <div style={{ padding:'3rem', border:'1px solid var(--border)', borderRadius:'6px', textAlign:'center' }}>
                <div style={{ fontFamily:'var(--display)', fontSize:'2rem', color:'var(--ink)', marginBottom:'0.5rem' }}>Message Sent ✓</div>
                <p style={{ fontSize:'14px', color:'var(--ink-3)', fontWeight:300 }}>I will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Full Name *</label>
                    <input className="form-input" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required placeholder="Your name" />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Email Address *</label>
                    <input className="form-input" type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required placeholder="your@email.com" />
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label">Subject *</label>
                  <input className="form-input" value={form.subject} onChange={e=>setForm(f=>({...f,subject:e.target.value}))} required placeholder="What is this about?" />
                </div>
                <div className="form-field">
                  <label className="form-label">Message *</label>
                  <textarea className="form-input form-textarea" value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} required placeholder="Tell me about your project..." />
                </div>
                {status === 'error' && <p style={{ fontSize:'13px', color:'#c0392b' }}>Something went wrong. Please try again.</p>}
                <button className="form-submit" type="submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}