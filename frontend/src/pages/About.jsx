import { useReveal } from '../hooks'

const skillGroups = [
  { title: 'Frontend', skills: ['React','Vite','JavaScript','HTML & CSS','Tailwind CSS','Framer Motion'] },
  { title: 'AI & Backend', skills: ['Claude API','OpenAI API','Python','Node.js','Express','FastAPI'] },
  { title: 'Design', skills: ['Figma','Adobe Photoshop','Illustrator','After Effects','Premiere Pro'] },
  { title: 'Tools', skills: ['Git & GitHub','MongoDB','Vercel','Render','Kali Linux','VS Code'] },
]

export default function About() {
  useReveal()
  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="label">Who I Am</div>
          <h1 className="heading">Design thinker,<br /><em>code builder</em></h1>
          <div className="divider" />
          <p style={{ fontSize:'1rem', color:'var(--ink-3)', fontWeight:300, lineHeight:1.8, maxWidth:520 }}>
            Founder, AI Engineer, and digital product builder based in Canterbury, England.
          </p>
        </div>
      </div>

      <section className="section section-white">
        <div className="section-inner about-grid">
          <div className="reveal">
            <div className="about-photo"><span className="about-initials">SR</span></div>
            <div className="about-meta">
              {[['Based in','Canterbury, UK'],['Available','Freelance & Full-time'],['Education','MSc Cybersecurity — CCCU'],['Company','NexaSeed — Founder & CEO'],['Experience','6+ Years']].map(([l,v]) => (
                <div className="about-meta-row" key={l}>
                  <span className="meta-label">{l}</span>
                  <span className="meta-value">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-body">
            <div className="label reveal">Biography</div>
            <h2 className="heading reveal" style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)' }}>The person<br /><em>behind the work</em></h2>
            <div className="divider reveal" />
            {[
              "I'm a Founder & AI Engineer based in Canterbury, England. My work sits at the intersection of design, engineering, and artificial intelligence — I build digital products that are both beautiful and technically robust.",
              "With over 6 years of professional experience in design and a growing depth in frontend development and AI, I founded NexaSeed to bring next-generation digital solutions to businesses worldwide.",
              "I'm currently completing my MSc in Cybersecurity at Canterbury Christ Church University, which has deepened my understanding of secure system design and responsible AI development.",
              "My approach is simple: understand the problem deeply, design with intention, build with precision, and iterate until the result is genuinely excellent — not just functional.",
            ].map((p,i) => <p key={i} className="reveal">{p}</p>)}
            <div className="stats-row reveal">
              {[['6+','Years in Design'],['50+','Projects Delivered'],['1','Company Founded']].map(([n,l]) => (
                <div className="stat-item" key={l}>
                  <div className="stat-num">{n}</div>
                  <div className="stat-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner skills-layout">
          <div>
            <div className="label reveal">Capabilities</div>
            <h2 className="heading reveal">Skills &<br /><em>Technologies</em></h2>
            <div className="divider reveal" />
            <p style={{ fontSize:'14px', color:'var(--ink-3)', fontWeight:300, lineHeight:1.8 }} className="reveal">
              A blend of creative and technical skills built across years of professional practice.
            </p>
          </div>
          <div>
            {skillGroups.map((g,gi) => (
              <div className={`skill-group reveal reveal-d${gi+1}`} key={g.title}>
                <div className="skill-group-title">{g.title}</div>
                <div className="skill-tags">
                  {g.skills.map(s => <span className="skill-tag" key={s}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="section-inner" style={{ maxWidth:800 }}>
          <div className="label label-light reveal">Approach</div>
          <h2 className="heading heading-light reveal">Work <em>Philosophy</em></h2>
          <div className="divider divider-dark reveal" />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'2rem' }}>
            {[
              ['Design First','Every build starts with a clear visual and functional design. I never write code without knowing exactly what I am building and why.'],
              ['Precision Over Speed','I would rather take an extra day and deliver something excellent than rush something mediocre. Quality is non-negotiable.'],
              ['Communication','I keep clients informed at every stage. No surprises. Clear, professional updates throughout.'],
              ['Long-Term Thinking','I build for maintainability and scale — not just the brief. Everything I ship should still work well in 3 years.'],
            ].map(([title,desc]) => (
              <div key={title} className="reveal" style={{ padding:'2rem', border:'1px solid var(--border-dark)', borderRadius:'6px' }}>
                <div style={{ fontFamily:'var(--display)', fontSize:'1.2rem', color:'var(--white)', marginBottom:'0.75rem' }}>{title}</div>
                <p style={{ fontSize:'13.5px', color:'var(--ink-3)', fontWeight:300, lineHeight:1.75 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}