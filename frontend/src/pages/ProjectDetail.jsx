import { useParams, Link } from 'react-router-dom'
import { useFetch, useReveal } from '../hooks'
import { api } from '../services/api'
import { Loading } from '../components/common/States'

export default function ProjectDetail() {
  const { slug } = useParams()
  const { data: project, loading, error } = useFetch(() => api.getProject(slug), [slug])
  useReveal()

  if (loading) return <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}><Loading /></div>
  if (error || !project) return <div className="section"><p style={{ color:'var(--ink-3)' }}>Project not found. <Link to="/projects">Go back</Link></p></div>

  return (
    <>
      <div className="project-detail-hero">
        <div style={{ maxWidth:1100 }}>
          <Link to="/projects" style={{ fontSize:'12.5px', color:'var(--ink-4)', textDecoration:'none', letterSpacing:'1px', textTransform:'uppercase', display:'inline-block', marginBottom:'2rem' }}>
            ← Back to Projects
          </Link>
          <div className="label">{project.category}</div>
          <h1 style={{ fontFamily:'var(--display)', fontSize:'clamp(2.5rem,6vw,6rem)', fontWeight:300, lineHeight:0.97, letterSpacing:'-1px', color:'var(--ink)', margin:'1rem 0 2rem' }}>
            {project.title}
          </h1>
          <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', alignItems:'center' }}>
            <span style={{ padding:'6px 16px', border:'1px solid var(--border)', borderRadius:'100px', fontSize:'12px', color:'var(--ink-3)' }}>{project.status}</span>
            {project.stack?.map(s => <span className="stack-tag" key={s}>{s}</span>)}
          </div>
        </div>
      </div>

      <div style={{ height:360, background:'linear-gradient(135deg,#efefec,#e2e2de)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--display)', fontSize:'2.5rem', fontStyle:'italic', color:'var(--ink-4)', borderBottom:'1px solid var(--border)' }}>
        {project.title}
      </div>

      <div className="project-detail-body">
        <div className="project-detail-grid">
          <div>
            {[['Overview', project.fullDesc], ['The Challenge', project.challenge], ['The Solution', project.solution], ['Outcome & Results', project.outcome]].map(([title, content]) => content ? (
              <div className="detail-section reveal" key={title}>
                <h3>{title}</h3>
                <p>{content}</p>
              </div>
            ) : null)}
          </div>
          <div className="detail-sidebar reveal">
            <div className="detail-meta-card">
              <h4>Tech Stack</h4>
              <div className="skill-tags">{project.stack?.map(s => <span className="skill-tag" key={s}>{s}</span>)}</div>
            </div>
            <div className="detail-meta-card">
              <h4>Links</h4>
              {project.liveUrl
                ? <a href={project.liveUrl} target="_blank" rel="noreferrer" className="detail-link">↗ Live Demo</a>
                : <p style={{ fontSize:'13px', color:'var(--ink-4)' }}>Live link not available</p>
              }
              {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="detail-link" style={{ marginTop:'0.5rem' }}>↗ GitHub Repo</a>}
            </div>
            <Link to="/contact" className="btn-primary" style={{ width:'100%', textAlign:'center', marginTop:'0.5rem' }}>Discuss a Similar Project</Link>
          </div>
        </div>
      </div>
    </>
  )
}