//prelogin

var express = require('express');
const app = require('../app');
var router = express.Router();
User=require('../models/user')
flash=require('connect-flash');

var requireResolve = require('require-resolve'),
path = require('path');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
}); 

router.get('/login', function(req, res, next) {
  error=req.flash('error')
  console.log('##ERROR>',error);
  res.render('prelogin/login',{error})
});

router.get('/register', function(req, res, next) {
  error=req.flash('error')
  console.log('##ERROR>',error);
  res.render('prelogin/register',{error})
});


//post login information
router.post('/login',(req,res)=>{
  email=req.body.email;
  password=req.body.password;
  User.findOne({email},(error,user)=>{
    if(error){return next(error)}
    if(!user){
      req.flash('error','information incorrect')
      res.redirect('/users/login')
    }
    else{
      //here
      user.verifyPassword(password,(err,result)=>{
        if(err){return next(err)}
        if(!result){
          req.flash('error','incorrect password');
          res.redirect('/users/login')
        }
        if(result){
          console.log('logged in');
          console.log(user);
          console.log('isAuth',req.session);
          res.render('postlogin/dashboard',{user});
        }
      })
    }
})});

//register information to log in 
router.post('/register',(req,res)=>{
  email=req.body.email;
  password=req.body.password;
  User.findOne({email},(error,user)=>{
    //if error
    if(error){return next(error)}
    //no user so register
   else if(!user){
     if(password<5){req.flash('error','password to short')
    res.redirect('/users/register')}
    else{
      console.log(req.body);
      User.create(req.body);
      res.redirect('/users/login');
    }
    }
    //user exists
    else{
      req.flash('error','User already Exists');
      res.redirect('/users/register');
    }
  })
});
router.get('/logout',(req,res)=>{
    res.clearCookie('Connect.Ident')
    res.redirect('/users/login');
});
module.exports = router;
