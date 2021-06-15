var express = require('express');
var router = express.Router();
User=require('../modules/user');
flash=require('connect-flash')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  error=req.flash('Error');
  res.render('register',{error});
});

router.post('/register', function(req, res, next) {
  password=req.body.password;
  email=req.body.email;

  //unique email
  User.findOne({email},(err,value)=>{
    if(err)return next(err);
     else if (value){
      //email not unique
      req.flash('Error','Not Unique Email');
      res.redirect('/users/register');
    }
    else{
      if(password.length<5){
        req.flash('Error','password should be more than 4 characters');
        res.redirect('/users/register');
      }
      //unique email
      User.create(req.body)
    }
  })  
});

router.get('/login', function(req, res, next) {
  error=req.flash('Error');
  res.render('login',{error});
});

router.post('/login', function(req, res, next) {
  email=req.body.email;
  password=req.body.password;
  User.findOne({email},(error,User)=>{
    //if error
    if(error){return next(error)}
    //no user
    if(!User){
      req.flash('Error','Email does not exist')
      return res.redirect('/users/login');
    }
    User.verifyPassword(password,(err,result)=>{
      if(err){return next(err)}
      if(!result){
        req.flash('Error','incorrect password')
        res.redirect('/users/login')
      }
      if(result){
        res.render('dashboard')
      }
    })
  })
});

//logout
router.post('/logout',(err,value)=>{
  req.session.destroy();
  res.redirect('/user/login')
});
module.exports = router;
