var express = require('express');
var router = express.Router();
var teacherModule=require('../../modules/teacher');

var bcrypt =require('bcryptjs');
const { check, validationResult } = require('express-validator');


function checkTeacherStatus(req,res,next){
  var email=req.body.email;
  var chekUser=teacherModule.findOne({email:email});
  chekUser.exec((err,data)=>{
    if(data==null){
      return res.send({redirectTo: 'user not found'});
    }else{
      var teacher_status = data.teacher_status;
      if(err) throw err;
      if(teacher_status=="disabled"){
        return res.send({redirectTo: 'Please Contact School Staff'});
      }
    }
   
 next();
  });
}



router.get('/', function(req, res, next) {
  res.render('teacher-login', { title: 'Password Management System'});
});

router.post('/post',checkTeacherStatus, function(req, res, next) {
  var email=req.body.email;
  var password=req.body.password;
  var checkUser=teacherModule.findOne({email:email});
  checkUser.exec((err, data)=>{
if(err) throw err;
var teacher_uid = data.teacher_uid;
var getPassword=data.password;
if(bcrypt.compareSync(password,getPassword)){
  res.send({redirect:'./teacher-admin-dashboard/'+teacher_uid});
}else{
  res.send({redirectTo: 'Invalid Password.'});
}
  });
});




module.exports = router;