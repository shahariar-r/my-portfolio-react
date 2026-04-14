import { Link } from 'react-router-dom'

export default function ProjectCard({ project, index }) {
  return (
    <div className="project-card">
      <div className="project-thumb">
        <span className="project-thumb-num">{String(index + 1).padStart(2, '0')}</span>
        {project.title}
        <span className="project-status">{project.status}</span>
      </div>
      <div className="project-body">
        <div className="project-cat">{project.category}</div>
        <div className="project-title">{project.title}</div>
        <p className="project-desc">{project.shortDesc}</p>
        <div className="stack-tags">
          {project.stack?.slice(0, 4).map(s => <span className="stack-tag" key={s}>{s}</span>)}
        </div>
        <Link to={`/projects/${project.slug}`} className="project-link">View Case Study →</Link>
      </div>
    </div>
  )
}