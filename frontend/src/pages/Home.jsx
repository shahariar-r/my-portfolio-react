import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useFetch, useReveal } from '../hooks'
import { api } from '../services/api'
import ProjectCard from '../components/common/ProjectCard'
import { Loading } from '../components/common/States'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid" />
      <div style={{ position:'relative', zIndex:1 }}>
        <div className="hero-tag"><span className="hero-tag-dot" />Available for work · Canterbury, UK</div>
        <h1 className="hero-name">Md Shahariar<em>Rahman</em></h1>
        <div className="hero-bottom">
          <p className="hero-sub">Founder & AI Engineer building intelligent digital products at the intersection of design, code, and artificial intelligence.</p>
          <div className="hero-btns">
            <Link to="/projects" className="btn-primary">View My Work</Link>
            <Link to="/contact" className="btn-outline">Get In Touch</Link>
          </div>
        </div>
      </div>
      <div className="hero-scroll" style={{ position:'absolute', bottom:'2.5rem', left:'3.5rem' }}>
        <div className="scroll-line" />Scroll to explore
      </div>
    </section>
  )
}

function FeaturedProjects() {
  const { data: projects, loading } = useFetch(() => api.getProjects({ featured: true }), [])
  return (
    <section className="section section-white">
      <div className="section-inner">
        <div className="label reveal">Selected Work</div>
        <h2 className="heading reveal">Featured <em>Projects</em></h2>
        <div className="divider reveal" />
        {loading ? <Loading /> : (
          <div className="projects-grid">
            {projects?.slice(0,3).map((p,i) => (
              <div className="reveal" key={p._id} style={{ transitionDelay:`${i*0.1}s` }}>
                <ProjectCard project={p} index={i} />
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop:'3rem', textAlign:'center' }} className="reveal">
          <Link to="/projects" className="btn-outline">View All Projects</Link>
        </div>
      </div>
    </section>
  )
}

function FeaturedServices() {
  const { data: services, loading } = useFetch(() => api.getServices(), [])
  return (
    <section className="section section-dark">
      <div className="section-inner">
        <div className="label label-light reveal">What I Offer</div>
        <h2 className="heading heading-light reveal">Services & <em>Solutions</em></h2>
        <div className="divider divider-dark reveal" />
        {loading ? <Loading /> : (
          <div className="services-grid-dark">
            {services?.slice(0,6).map((s,i) => (
              <div className={`service-card-dark reveal reveal-d${(i%3)+1}`} key={s._id}>
                <div className="service-icon">{s.icon}</div>
                <div className="service-title-light">{s.title}</div>
                <p className="service-desc-light">{s.shortDesc}</p>
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop:'3rem', textAlign:'center' }} className="reveal">
          <Link to="/services" className="btn-ghost">Explore All Services</Link>
        </div>
      </div>
    </section>
  )
}

function TestimonialPreview() {
  const { data, loading } = useFetch(() => api.getTestimonials({ featured: true }), [])
  return (
    <section className="section">
      <div className="section-inner">
        <div className="label reveal">What Clients Say</div>
        <h2 className="heading reveal">Client <em>Reviews</em></h2>
        <div className="divider reveal" />
        {loading ? <Loading /> : (
          <div className="testimonials-grid">
            {data?.slice(0,2).map(t => (
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
        <div style={{ marginTop:'3rem', textAlign:'center' }} className="reveal">
          <Link to="/reviews" className="btn-outline">Read All Reviews</Link>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section style={{ background:'var(--ink)', padding:'6rem 3.5rem', textAlign:'center' }}>
      <div style={{ maxWidth:600, margin:'0 auto' }}>
        <h2 style={{ fontFamily:'var(--display)', fontSize:'clamp(2rem,5vw,4rem)', fontWeight:300, color:'var(--white)', lineHeight:1.05, marginBottom:'1.5rem' }} className="reveal">
          Let's build something<br /><em style={{ fontStyle:'italic', color:'var(--ink-3)' }}>remarkable</em>
        </h2>
        <p style={{ fontSize:'14px', color:'var(--ink-3)', fontWeight:300, lineHeight:1.8, marginBottom:'2.5rem' }} className="reveal">
          Whether you have a clear brief or just an idea — I'd love to hear from you.
        </p>
        <div className="reveal">
          <Link to="/contact" className="btn-primary" style={{ background:'var(--white)', color:'var(--ink)', borderColor:'var(--white)' }}>
            Start a Conversation
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useReveal()
  return <><Hero /><FeaturedProjects /><FeaturedServices /><TestimonialPreview /><CTA /></>
}