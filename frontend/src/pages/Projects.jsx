import { useState, useEffect } from 'react'
import { useReveal } from '../hooks'
import { api } from '../services/api'
import ProjectCard from '../components/common/ProjectCard'
import { Loading, Empty, ErrorMsg } from '../components/common/States'

const CATS = ['All','Web App','Software','UI/UX Design','Branding','AI / Automation']

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  useReveal()

  useEffect(() => {
    setLoading(true)
    const params = {}
    if (category !== 'All') params.category = category
    if (search) params.search = search
    api.getProjects(params)
      .then(res => setProjects(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [category, search])

  return (
    <>
      <div className="page-header">
        <div className="page-header-inner">
          <div className="label">Selected Work</div>
          <h1 className="heading">Projects & <em>Case Studies</em></h1>
          <div className="divider" />
          <p style={{ fontSize:'1rem', color:'var(--ink-3)', fontWeight:300, lineHeight:1.8 }}>
            Real projects — web apps, software, design work, AI tools, and brand identities.
          </p>
        </div>
      </div>
      <section className="section">
        <div className="section-inner">
          <input className="search-input" type="text" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} />
          <div className="filter-bar">
            {CATS.map(cat => (
              <button key={cat} className={`filter-btn ${category === cat ? 'active' : ''}`} onClick={() => setCategory(cat)}>{cat}</button>
            ))}
          </div>
          {loading ? <Loading /> : error ? <ErrorMsg message={error} /> : !projects?.length ? <Empty message="No projects found." /> : (
            <div className="projects-grid">
              {projects.map((p,i) => (
                <div className="reveal" key={p._id} style={{ transitionDelay:`${(i%3)*0.1}s` }}>
                  <ProjectCard project={p} index={i} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}