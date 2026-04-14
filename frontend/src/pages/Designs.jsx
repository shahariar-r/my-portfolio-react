import { useReveal } from '../hooks'

const designs = [
  { id:1, title:'NexaSeed Brand Identity', cat:'Branding', desc:'Full brand system including logo, typography, and colour palette.' },
  { id:2, title:'E-Commerce UI Kit', cat:'UI/UX Design', desc:'Component library and page templates for a fashion retailer.' },
  { id:3, title:'SaaS Dashboard', cat:'UI/UX Design', desc:'Analytics dashboard design for a B2B software product.' },
  { id:4, title:'Mobile App UI', cat:'UI/UX Design', desc:'iOS/Android design for a productivity application.' },
  { id:5, title:'Agency Landing Page', cat:'Web Design', desc:'Premium landing page design for a creative agency.' },
  { id:6, title:'Motion Graphics Reel', cat:'Motion', desc:'Showreel of motion graphics and animation work.' },
]

export default function Designs() {
  useReveal()
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="label">Visual Work</div>
          <h1 className="heading">Design <em>Gallery</em></h1>
          <div className="divider" />
          <p style={{ fontSize:'1rem', color:'var(--ink-3)', fontWeight:300, lineHeight:1.8 }}>
            UI designs, brand identities, landing pages, and visual work — 6+ years of creative output.
          </p>
        </div>
      </div>
      <section className="section">
        <div className="section-inner">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem' }}>
            {designs.map((d,i) => (
              <div key={d.id} className="project-card reveal" style={{ transitionDelay:`${(i%3)*0.1}s` }}>
                <div className="project-thumb" style={{ aspectRatio:'4/3', fontSize:'1.2rem' }}>
                  <span className="project-thumb-num">{String(i+1).padStart(2,'0')}</span>
                  {d.title}
                </div>
                <div className="project-body">
                  <div className="project-cat">{d.cat}</div>
                  <div className="project-title">{d.title}</div>
                  <p className="project-desc">{d.desc}</p>
                  <a href="https://behance.net/shahriar880" target="_blank" rel="noreferrer" className="project-link">View on Behance →</a>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:'4rem', textAlign:'center', padding:'3rem', border:'1px solid var(--border)', borderRadius:'8px', background:'var(--white)' }} className="reveal">
            <div style={{ fontFamily:'var(--display)', fontSize:'1.5rem', color:'var(--ink)', marginBottom:'0.75rem' }}>See the full portfolio</div>
            <p style={{ fontSize:'14px', color:'var(--ink-3)', fontWeight:300, marginBottom:'1.5rem' }}>All design work is published on Behance with full case studies.</p>
            <a href="https://behance.net/shahriar880" target="_blank" rel="noreferrer" className="btn-primary">Visit Behance Profile →</a>
          </div>
        </div>
      </section>
    </>
  )
}