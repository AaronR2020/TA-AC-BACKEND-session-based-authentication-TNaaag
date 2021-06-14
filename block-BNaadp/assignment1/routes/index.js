var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res){
  console.log('Cookies: ', req.cookies);
  res.cookie('name', 'Rebelo',{expire: 3000 + Date.now()}).send('cookie is set'); //Sets name = Rebelo
});
module.exports = router;
