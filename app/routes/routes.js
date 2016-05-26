const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
  res.render('index', {title: 'Express'});
});

router.get('/patches', (req, res) => {
  res.render('patches');
});

router.get('/stickers', (req, res) => {
  res.render('stickers');
});

router.get('/patches/:filename', (req, res) => {
  res.render(`patches/${req.params.filename}`);
});

module.exports = router;
