/**
 * Auth Middleware
 */

function requireAdmin(req, res, next) {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  return res.status(401).json({ success: false, message: 'Unauthorized. Admin login required.' });
}

module.exports = { requireAdmin };
