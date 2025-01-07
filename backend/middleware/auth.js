// backend/middleware/auth.js

const basicAuth = require('basic-auth');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const authMiddleware = async (req, res, next) => {
  try {
    const credentials = basicAuth(req);
    
    if (!credentials) {
      res.setHeader('WWW-Authenticate', 'Basic');
      return res.status(401).json({ message: 'Authentication required' });
    }

    const user = await User.findOne({ where: { email: credentials.name } });
    if (!user || !await bcrypt.compare(credentials.pass, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = authMiddleware;