const mongoose = require('mongoose')
const s = new mongoose.Schema({
  icon: { type: String, default: '◈' },
  title: { type: String, required: true },
  shortDesc: { type: String, required: true },
  features: [String],
  forWho: String,
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true })
module.exports = mongoose.model('Service', s)