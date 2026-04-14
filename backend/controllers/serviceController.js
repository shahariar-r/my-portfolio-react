const Service = require('../models/Service')
exports.getAll = async (req, res) => {
  try {
    const data = await Service.find({ active: true }).sort({ order: 1 })
    res.json({ success: true, data })
  } catch (err) { res.status(500).json({ success: false, message: err.message }) }
}
exports.create = async (req, res) => {
  try {
    const service = await Service.create(req.body)
    res.status(201).json({ success: true, data: service })
  } catch (err) { res.status(400).json({ success: false, message: err.message }) }
}