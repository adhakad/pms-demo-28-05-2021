var express = require('express');
var router = express.Router();
var teacherModel=require('../../../modules/teacher');

var bodyParser = require('body-parser');

var path = require('path');

var bcrypt =require('bcryptjs');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
const { check, validationResult } = require('express-validator');
router.use(express.static(__dirname+"./public/"));
router.use(express.static(__dirname+"./public/script/ajax/admin/teacher/"));

 function checkEmail(req,res,next){
  var email=req.body.email;
  var checkexitemail=teacherModel.findOne({email:email});
  checkexitemail.exec((err,data)=>{
 if(err) throw err;
 if(data){
return res.send({redirectTo: "Email Already Exit"});
 }
 next();
  });
}
function checkTeacherId(req,res,next){
  var teacher_uid = req.body.teacher_uid;
  var checkexitemail=teacherModel.findOne({teacher_uid:teacher_uid});
  checkexitemail.exec((err,data)=>{
 if(err) throw err;
 if(data){
return res.send({redirectTo: "Teacher Id Already Exit"});
 }
 next();
  });
}
function checkConfirmPass(req,res,next){
  var password=req.body.password;
  var confpassword=req.body.confpassword;
  if(password !=confpassword){
    return res.send({redirectTo: "Password not matched!"});
  }
  next();
}
 

router.get('/', function(req, res, next) {
   res.render('teacher', { title: 'Teacher Details'});
});

router.post('/post',checkEmail,checkTeacherId,checkConfirmPass,function(req, res, next) {
  var teachername=req.body.tname; 
  var teacher_uid = req.body.teacher_uid;
  var image = "file_1613209562664.png";
  var email=req.body.email;
  var password=req.body.password;
  
  var exist_id=1234567890;
  var class_name=224165;
  var subject_name="saw24d66tfsw";
  var teacher_status="disabled";
  var class_teacher_status="inactive";

  password =bcrypt.hashSync(req.body.password,10);
  var userDetails=new teacherModel({
    teachername:teachername,
    teacher_uid:teacher_uid,
    exist_id:exist_id,
    image:image,
    class_name:class_name,
    subject_name:subject_name,
    email:email,
    password:password,
    teacher_status:teacher_status,
    class_teacher_status:class_teacher_status,
  });
  userDetails.save((err,doc)=>{
    if(err) throw err;
    res.send({redirectTo:"Teacher Detail's Inserted Successfully!"});
  }); 
});

module.exports = router;