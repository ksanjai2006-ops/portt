/**
 * Auth Routes - /api/auth
 */

const express = require('express');
const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    req.session.isAdmin = true;
    req.session.user = username;
    return res.json({ success: true, message: 'Login successful.', user: username });
  }

  return res.status(401).json({ success: false, message: 'Invalid username or password.' });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed.' });
    }
    res.clearCookie('connect.sid');
    return res.json({ success: true, message: 'Logged out successfully.' });
  });
});

// GET /api/auth/status
router.get('/status', (req, res) => {
  if (req.session && req.session.isAdmin) {
    return res.json({ loggedIn: true, user: req.session.user });
  }
  return res.json({ loggedIn: false });
});

module.exports = router;
