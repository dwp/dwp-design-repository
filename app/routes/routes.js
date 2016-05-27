const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
  res.redirect('/patches');
});

router.get('/patches', (req, res) => {
  res.render('patches');
});

router.get('/stickers', (req, res) => {
  res.render('stickers');
});

router.get('/patches/:filename', (req, res) => {
  const filename = req.params.filename.split('.')[0];
  res.render(`patches/${filename}`, {filename});
});

router.get('/stickers/:filename', (req, res) => {
  const filename = req.params.filename.split('.')[0];
  res.render(`stickers/${filename}`, {filename});
});

module.exports = router;
