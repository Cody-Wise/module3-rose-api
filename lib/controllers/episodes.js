const { Router } = require('express');
const Episode = require('../models/episode');

module.exports = Router().get('/', async (req, res) => {
  const characters = await Episode.getAll();
  res.json(characters);
});
