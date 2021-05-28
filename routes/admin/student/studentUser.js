var express = require('express');
var router = express.Router();
var studentUserModel=require('../../../modules/studentUser');
var totalAdminClass=require('../../../modules/totalAdminClass');

var bodyParser = require('body-parser');
var path = require('path');

var bcrypt =require('bcryptjs');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
const { check, validationResult } = require('express-validator');
router.use(express.static(__dirname+"./public/"));


function checkStudentId(req,res,next){
  var student_id=req.body.student_id;
  var checkExitStudent_id=studentUserModel.findOne({student_id:student_id});
  checkExitStudent_id.exec((err,data)=>{
  if(err) throw err;
  if(data){
    return res.send({redirectTo:"Student-Id Already Exit!"});
  }
 next();
  });
}
function checkConfirmPass(req,res,next){
  var password=req.body.password;
  var confpassword=req.body.confpassword;
  if(password !=confpassword){
    return res.send({redirectTo:"Password not matched!"});
  }
  next();
}


router.get('/', function(req, res,) {
  var totalClass=totalAdminClass.find({});
  totalClass.exec((err,data)=>{
    if(err) throw err;
    res.render('studentUserClass', { title: 'Student-User Details',msg:'',records:data});
  });
});

router.get('/:id', function(req, res,) {
  var class_name=req.params.id;
  totalClass=totalAdminClass.findOne({class_name:class_name});
  totalClass.exec((err,data)=>{
    if(err) throw err;
    res.render('./admin/students/studentUser', { title: 'TechBista Solutions',msg:'', records:data,});
  });
  router.post('/'+class_name+'/post',checkStudentId,checkConfirmPass,function(req, res,) {
    var student_name=req.body.student_name; 
    var student_id=req.body.student_id;
    var password=req.body.password;
    var status="disabled";
    var unique_user ="no";
    password =bcrypt.hashSync(req.body.password,10);
    var userDetails=new studentUserModel({
      student_name:student_name,
      class_name:class_name,
      student_id:student_id,
      password:password,
      status:status,
      unique_user,
    });
    userDetails.save((err,doc)=>{
      if(err) throw err;
      res.send({redirectTo:"Student-User Details Inserted Successfully!"});
    }); 
  });
});

module.exports = router;