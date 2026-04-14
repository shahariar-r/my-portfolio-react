import { Link } from 'react-router-dom'
import { useFetch, useReveal } from '../hooks'
import { api } from '../services/api'
import { Loading } from '../components/common/States'

export default function Services() {
  const { data: services, loading } = useFetch(() => api.getServices(), [])
  useReveal()
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="label">What I Offer</div>
          <h1 className="heading">Services & <em>Solutions</em></h1>
          <div className="divider" />
          <p style={{ fontSize:'1rem', color:'var(--ink-3)', fontWeight:300, lineHeight:1.8 }}>
            From AI agents to brand identities — end-to-end digital services for founders and businesses.
          </p>
        </div>
      </div>
      <section className="section section-dark">
        <div className="section-inner">
          {loading ? <Loading /> : (
            <div className="services-grid-dark">
              {services?.map((s,i) => (
                <div className={`service-card-dark reveal reveal-d${(i%3)+1}`} key={s._id}>
                  <div className="service-icon">{s.icon}</div>
                  <div className="service-title-light">{s.title}</div>
                  <p className="service-desc-light">{s.shortDesc}</p>
                  {s.features?.length > 0 && (
                    <ul className="service-features">
                      {s.features.map(f => <li key={f}>{f}</li>)}
                    </ul>
                  )}
                  {s.forWho && <p className="service-for">For: {s.forWho}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="section section-white">
        <div className="section-inner">
          <div className="label reveal">How I Work</div>
          <h2 className="heading reveal">The <em>Process</em></h2>
          <div className="divider reveal" />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'2rem' }}>
            {[['01','Discovery','Understanding your goals before suggesting any solution.'],['02','Design','Visual design approved before any code is written.'],['03','Build','Clean code built to spec with regular progress updates.'],['04','Launch','Thorough testing, deployment, and full handover.']].map(([n,t,d]) => (
              <div key={n} className="reveal" style={{ borderTop:'1px solid var(--border)', paddingTop:'1.5rem' }}>
                <div style={{ fontFamily:'var(--display)', fontSize:'2.5rem', fontWeight:300, color:'var(--border)', marginBottom:'1rem', fontStyle:'italic' }}>{n}</div>
                <div style={{ fontFamily:'var(--display)', fontSize:'1.2rem', color:'var(--ink)', marginBottom:'0.5rem' }}>{t}</div>
                <p style={{ fontSize:'13px', color:'var(--ink-3)', fontWeight:300, lineHeight:1.7 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ textAlign:'center' }}>
        <div style={{ maxWidth:500, margin:'0 auto' }} className="reveal">
          <h2 className="heading" style={{ marginBottom:'1rem' }}>Ready to <em>get started?</em></h2>
          <p style={{ fontSize:'14px', color:'var(--ink-3)', fontWeight:300, lineHeight:1.8, marginBottom:'2rem' }}>Tell me about your project and I will get back to you within 24 hours.</p>
          <Link to="/contact" className="btn-primary">Start a Project</Link>
        </div>
      </section>
    </>
  )
}