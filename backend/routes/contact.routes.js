// backend/routes/contact.routes.js
const express = require('express');
const ContactMessage = require('../models/ContactMessage');
const { protect } = require('../middleware/auth.middleware');
const { adminOnly } = require('../middleware/role.middleware');
const router = express.Router();

// ── POST /api/contact ───────────────────────────────────
// Anyone can submit a contact message
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    // Create contact message
    const contactMessage = await ContactMessage.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    res.status(201).json({
      message: 'Your message has been sent successfully',
      data: contactMessage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── GET /api/contact ───────────────────────────────────
// Admin only - get all contact messages
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── PUT /api/contact/:id ───────────────────────────────────
// Admin only - mark message as read/replied
router.put('/:id', protect, adminOnly, async (req, res) => {
  const { status } = req.body;
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── DELETE /api/contact/:id ───────────────────────────────────
// Admin only - delete message
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
