const Testimonial = require('../models/Testimonial')

exports.getApproved = async (req, res) => {
  try {
    const filter = { status: 'approved' }
    if (req.query.featured === 'true') filter.featured = true
    const data = await Testimonial.find(filter).sort({ featured: -1, createdAt: -1 })
    res.json({ success: true, data })
  } catch (err) { res.status(500).json({ success: false, message: err.message }) }
}

exports.submit = async (req, res) => {
  try {
    const { name, company, role, rating, feedback } = req.body
    if (!name || !rating || !feedback) {
      return res.status(400).json({ success: false, message: 'Name, rating and feedback required.' })
    }
    const t = await Testimonial.create({ name, company, role, rating, feedback, status: 'pending' })
    res.status(201).json({ success: true, message: 'Review submitted for approval.', data: t })
  } catch (err) { res.status(400).json({ success: false, message: err.message }) }
}

exports.getAll = async (req, res) => {
  try {
    const data = await Testimonial.find().sort({ createdAt: -1 })
    res.json({ success: true, data })
  } catch (err) { res.status(500).json({ success: false, message: err.message }) }
}

exports.updateStatus = async (req, res) => {
  try {
    const t = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    res.json({ success: true, data: t })
  } catch (err) { res.status(400).json({ success: false, message: err.message }) }
}

exports.remove = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Deleted' })
  } catch (err) { res.status(500).json({ success: false, message: err.message }) }
}