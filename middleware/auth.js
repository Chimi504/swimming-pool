const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  authenticate(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
      next();
    } catch {
      return res.redirect('/login');
    }
  },

  verifyAdmin(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== 'admin') return res.status(403).send('Access denied');
      next();
    } catch {
      res.clearCookie('token');
      return res.redirect('/login');
    }
  },
};
