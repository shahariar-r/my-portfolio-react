const mongoose = require('mongoose')
const s = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  shortDesc: { type: String, required: true },
  fullDesc: { type: String, required: true },
  challenge: String,
  solution: String,
  outcome: String,
  category: { type: String, required: true, enum: ['Web App','Software','UI/UX Design','Branding','AI / Automation'] },
  status: { type: String, enum: ['Live','In Progress','Completed','Case Study'], default: 'Completed' },
  stack: [String],
  liveUrl: String,
  githubUrl: String,
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true })
module.exports = mongoose.model('Project', s)