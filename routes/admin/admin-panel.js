var express = require('express');
var router = express.Router();
var adminUserModule=require('../../modules/adminUser');


var bcrypt =require('bcryptjs');
const { check, validationResult } = require('express-validator');

/* GET home page. */





function checkUsername(req,res,next){
  var email=req.body.email;
  var checkexitemail=adminUserModule.findOne({email:email});
  checkexitemail.exec((err,data)=>{
    if(err) throw err;
    if(data==null){
      return res.send({redirectTo: 'user not found'});
    }
   next();
  });
}


router.get('/', function(req, res, next) {
 
  res.render('index', { title: 'Password Management System'});
  
});
router.post('/post',checkUsername,function(req, res, next) {
  var email=req.body.email;
  var password=req.body.password;
  var checkUser=adminUserModule.findOne({email:email});
  checkUser.exec((err, data)=>{
    if(err) throw err;
    var getPassword=data.password;
    if(bcrypt.compareSync(password,getPassword)){
      res.send({redirect:'./admin-dashboard'});
    }else{
      res.send({redirectTo: 'Invalid Password.'});
    }
  });
});







router.get('/signup', function(req, res, next) {
  
  res.render('signup', { title: 'Password Management System', msg:'' });
  
});
router.post('/signup',function(req, res, next) {
        var email=req.body.email;
        var password=req.body.password;
        var confpassword=req.body.confpassword;
  if(password !=confpassword){
    res.render('signup', { title: 'Password Management System', msg:'Password not matched!' });
   
  }else{
    password =bcrypt.hashSync(req.body.password,10);
        var userDetails=new adminUserModule({
          email:email,
          password:password,
        });
     userDetails.save((err,doc)=>{
        if(err) throw err;
        res.render('signup', { title: 'Password Management System', msg:'User Registerd Successfully' });
     })  ;
    } 

  
});




module.exports = router;
