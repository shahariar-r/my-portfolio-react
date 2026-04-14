const mongoose = require('mongoose')
const s = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  ip: String,
}, { timestamps: true })
module.exports = mongoose.model('ContactMessage', s)