const mongoose = require('mongoose')
const s = new mongoose.Schema({
  name: { type: String, required: true },
  company: String,
  role: String,
  rating: { type: Number, required: true, min: 1, max: 5 },
  feedback: { type: String, required: true },
  status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
  featured: { type: Boolean, default: false },
}, { timestamps: true })
module.exports = mongoose.model('Testimonial', s)