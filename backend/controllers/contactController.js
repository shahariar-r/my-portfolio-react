const ContactMessage = require('../models/ContactMessage')

exports.submit = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address.' })
    }

    const msg = await ContactMessage.create({
      name, email, subject, message,
      ip: req.ip,
    })

    // Optional: send email notification
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const nodemailer = require('nodemailer')
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
        })
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_TO || process.env.EMAIL_USER,
          subject: `Portfolio Contact: ${subject}`,
          text: `From: ${name} <${email}>\n\n${message}`,
        })
      } catch (emailErr) {
        console.warn('Email send failed (non-critical):', emailErr.message)
      }
    }

    res.status(201).json({ success: true, message: 'Message received! I will get back to you within 24 hours.' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.getAll = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 })
    res.json({ success: true, data: messages })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
