var express = require('express');
var router = express.Router();
User=require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/register', function(req, res, next) {
  res.render('register');
});
router.post('/register', function(req, res, next) {
  User.create(req.body);
  res.send("You've registered")
});

module.exports = router;
