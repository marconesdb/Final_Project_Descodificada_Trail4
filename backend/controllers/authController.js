//backend/controllers/authControlller.js

const User = require('../models/User');

const authController = {
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;
      
      const user = await User.create({ name, email, password, role });
      
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async listUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'role']
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = authController;