import { useState } from 'react'
import { useFetch, useReveal } from '../hooks'
import { api } from '../services/api'
import { Loading, Empty } from '../components/common/States'

function ReviewForm() {
  const [form, setForm] = useState({ name:'', company:'', role:'', rating:5, feedback:'' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await api.submitTestimonial(form)
      setStatus('success')
      setForm({ name:'', company:'', role:'', rating:5, feedback:'' })
    } catch { setStatus('error') } finally { setLoading(false) }
  }

  return (
    <section className="section section-white">
      <div className="section-inner" style={{ maxWidth:700 }}>
        <div className="label reveal">Leave a Review</div>
        <h2 className="heading reveal">Share Your <em>Experience</em></h2>
        <div className="divider reveal" />
        {status === 'success' ? (
          <div style={{ padding:'2rem', border:'1px solid var(--border)', borderRadius:'6px', textAlign:'center' }}>
            <div style={{ fontFamily:'var(--display)', fontSize:'2rem', color:'var(--ink)', marginBottom:'0.5rem' }}>Thank you ✓</div>
            <p style={{ fontSize:'14px', color:'var(--ink-3)', fontWeight:300 }}>Your review will appear after approval.</p>
          </div>
        ) : (
          <form className="form reveal" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label className="form-label">Your Name *</label>
                <input className="form-input" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} required placeholder="Jane Smith" />
              </div>
              <div className="form-field">
                <label className="form-label">Company</label>
                <input className="form-input" value={form.company} onChange={e => setForm(f=>({...f,company:e.target.value}))} placeholder="Acme Ltd" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label className="form-label">Your Role</label>
                <input className="form-input" value={form.role} onChange={e => setForm(f=>({...f,role:e.target.value}))} placeholder="CEO, Designer..." />
              </div>
              <div className="form-field">
                <label className="form-label">Rating *</label>
                <select className="form-input" value={form.rating} onChange={e => setForm(f=>({...f,rating:e.target.value}))}>
                  {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Star{r!==1?'s':''}</option>)}
                </select>
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">Your Review *</label>
              <textarea className="form-input form-textarea" value={form.feedback} onChange={e => setForm(f=>({...f,feedback:e.target.value}))} required placeholder="Tell others about your experience..." />
            </div>
            {status === 'error' && <p style={{ fontSize:'13px', color:'#c0392b' }}>Something went wrong. Please try again.</p>}
            <button className="form-submit" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Review →'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default function Reviews() {
  const { data: testimonials, loading } = useFetch(() => api.getTestimonials(), [])
  useReveal()
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="label">Social Proof</div>
          <h1 className="heading">Client <em>Reviews</em></h1>
          <div className="divider" />
          <p style={{ fontSize:'1rem', color:'var(--ink-3)', fontWeight:300, lineHeight:1.8 }}>What clients say about working with me.</p>
        </div>
      </div>
      <section className="section">
        <div className="section-inner">
          {loading ? <Loading /> : !testimonials?.length ? <Empty message="No reviews yet. Be the first!" /> : (
            <div className="testimonials-grid">
              {testimonials.map(t => (
                <div className="testimonial-card reveal" key={t._id}>
                  <div className="testimonial-stars">{'★'.repeat(t.rating)}{'☆'.repeat(5-t.rating)}</div>
                  <p className="testimonial-text">"{t.feedback}"</p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">{t.name[0]}</div>
                    <div>
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-role">{t.role}{t.company ? ` · ${t.company}` : ''}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <ReviewForm />
    </>
  )
}