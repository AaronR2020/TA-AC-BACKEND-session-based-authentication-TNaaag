var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
  User.create(req.body)
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {

  email=req.body.email;
  password=req.body.password;
  User.findOne({email},(error,User)=>{
    //if error
    if(error){return next(error)}
    //no user
    if(!User){
      console.log("no user");
      return res.redirect('/users/login');
    }
    User.verifyPassword(password,(err,result)=>{
      if(err){return next(err)}
      if(!result){res.redirect('/users/login')}
      if(result){
        res.send("Youve logged in")
        console.log("logged in");
      }
    })
  })
});

module.exports = router;
