const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Request failed')
  return data
}

export const api = {
  getProjects: (params = {}) => {
    const q = new URLSearchParams(params).toString()
    return request(`/projects${q ? '?' + q : ''}`)
  },
  getProject: (slug) => request(`/projects/${slug}`),
  createProject: (body) => request('/projects', { method: 'POST', body: JSON.stringify(body) }),
  updateProject: (id, body) => request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteProject: (id) => request(`/projects/${id}`, { method: 'DELETE' }),
  getTestimonials: (params = {}) => {
    const q = new URLSearchParams(params).toString()
    return request(`/testimonials${q ? '?' + q : ''}`)
  },
  submitTestimonial: (body) => request('/testimonials', { method: 'POST', body: JSON.stringify(body) }),
  getServices: () => request('/services'),
  createService: (body) => request('/services', { method: 'POST', body: JSON.stringify(body) }),
  submitContact: (body) => request('/contact', { method: 'POST', body: JSON.stringify(body) }),
}