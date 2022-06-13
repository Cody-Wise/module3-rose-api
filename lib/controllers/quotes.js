const { Router } = require('express');
const { Quote } = require('../models/Quote');

module.exports = Router().get('/', async (req, res) => {
  const quotes = await Quote.getAll();
  res.json(quotes);
});
