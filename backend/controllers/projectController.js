const Project = require('../models/Project')
exports.getAll = async (req, res) => {
  try {
    const { category, featured, search } = req.query
    const filter = {}
    if (category && category !== 'All') filter.category = category
    if (featured === 'true') filter.featured = true
    if (search) filter.title = { $regex: search, $options: 'i' }
    const projects = await Project.find(filter).sort({ featured: -1, order: 1, createdAt: -1 })
    res.json({ success: true, data: projects })
  } catch (err) { res.status(500).json({ success: false, message: err.message }) }
}
exports.getOne = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug })
    if (!project) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, data: project })
  } catch (err) { res.status(500).json({ success: false, message: err.message }) }
}
exports.create = async (req, res) => {
  try {
    const project = await Project.create(req.body)
    res.status(201).json({ success: true, data: project })
  } catch (err) { res.status(400).json({ success: false, message: err.message }) }
}
exports.update = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!project) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, data: project })
  } catch (err) { res.status(400).json({ success: false, message: err.message }) }
}
exports.remove = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Deleted' })
  } catch (err) { res.status(500).json({ success: false, message: err.message }) }
}