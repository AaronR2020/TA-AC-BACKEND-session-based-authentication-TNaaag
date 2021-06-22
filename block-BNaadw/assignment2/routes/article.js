var express = require('express');
const app = require('../app');
var router = express.Router();
Article=require('../models/article')
flash=require('connect-flash');

function isAuthenticated(req,res,next){
  console.log('function is Auth',req.session);
  if(req.session){next()}
  else{res.redirect('/users/login')}
}

router.get('/',isAuthenticated,function(req, res, next) {
    res.send('respond with a resource');
  }); 

module.exports = router;
