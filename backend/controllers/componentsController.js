// backend/controllers/componentsController.js

const Component = require('../models/Component');
const { Op } = require('sequelize');

const componentController = {
  async getAll(req, res) {
    try {
      const { search } = req.query;
      const where = search ? { name: { [Op.like]: `%${search}%` } } : {};
      const components = await Component.findAll({ where });
      res.json(components);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async create(req, res) {
    try {
      const component = await Component.create(req.body);
      res.status(201).json(component);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await Component.update(req.body, {
        where: { id: req.params.id }
      });
      
      if (!updated) {
        return res.status(404).json({ message: 'Component not found' });
      }
      
      res.status(200).json({ message: 'Component updated' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Component.destroy({
        where: { id: req.params.id }
      });
      
      if (!deleted) {
        return res.status(404).json({ message: 'Component not found' });
      }
      
      res.status(200).json({ message: 'Component deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = componentController;