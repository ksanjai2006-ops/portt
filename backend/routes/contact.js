/**
 * Contact Routes - /api/contact
 */

const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../middleware/auth');

// In-memory message store (use a database in production)
let messages = [];

// POST /api/contact — submit a contact message
router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' });
  }

  const newMessage = {
    id: Date.now().toString(),
    name,
    email,
    subject,
    message,
    timestamp: new Date().toISOString(),
    read: false
  };

  messages.push(newMessage);
  console.log(`📩 New contact message from ${name} <${email}>`);

  return res.json({ success: true, message: 'Message received successfully!' });
});

// GET /api/contact/messages — admin only: get all messages
router.get('/messages', requireAdmin, (req, res) => {
  return res.json({ success: true, messages: messages.reverse() });
});

// DELETE /api/contact/messages/:id — admin only: delete a message
router.delete('/messages/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const idx = messages.findIndex(m => m.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Message not found.' });
  }
  messages.splice(idx, 1);
  return res.json({ success: true, message: 'Message deleted.' });
});

module.exports = router;
