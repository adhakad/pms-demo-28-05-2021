var express = require('express');

var router = express.Router();
var totalAdminClass=require('../../../modules/totalAdminClass');
var classModule = require('../../../modules/class');

var teacherModule = require('../../../modules/teacher')
var studentUserModule=require('../../../modules/studentUser');


var bodyParser = require('body-parser');
var path = require('path');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
const { check, validationResult } = require('express-validator');
router.use(express.static(__dirname+"./public/"));
router.use(express.static(__dirname+"./public/script/ajax/admin/totalAdminClass/"));


function checkClass(req,res,next){
  var class_name =  req.body.class_name;
  var totalClass=totalAdminClass.findOne({class_name:class_name});
  totalClass.exec((err,data)=>{
    if(err) throw err;
    if(data)
    {
     return res.send({redirect: "Class Detail's Already Exist!"});
    }
    next();
  });
} 


router.get('/', function(req, res, next) {
   res.render('admin/totalAdminClass/totalAdminClass');
});

router.post('/post',checkClass,function(req, res, next) {
  var class_name =  req.body.class_name; 
  var totalClass = new totalAdminClass({
    class_name: class_name,
  });
  totalClass.save((err,doc)=>{
    if(err) throw err;
    res.send({redirect:"Class Detail's Inserted Successfully!"}); 
   });
});

router.get('/get',function(req, res, next) {
  var totalClass=totalAdminClass.find({});
  totalClass.exec((err,data)=>{
    if(err) throw err;
    if(err){
      res.send({msg:'error'});
    }else{
      res.send({msg:'success',data:data});
    }
  }); 
});


router.delete('/delete',function(req, res, next) {
  var id = req.body.id;
  var totalClass=totalAdminClass.findByIdAndDelete({_id:id});
  totalClass.exec((err,data)=>{
    if(err) throw err;
    if(err){
      res.send({msg:'error'});
    }else{
      res.send({msg:'success'});
    }
  }); 
});

router.put('/update',function(req, res, next) {
  var id = req.body.id;
  var totalClass=totalAdminClass.findByIdAndUpdate(id,{class_name:'1234567890'});
  totalClass.exec((err,data)=>{
    if(err) throw err;
    res.send(data);
  });
});

router.put('/updates',function(req, res, next) {
  var id = req.body.id;
  var totalClass=totalAdminClass.findByIdAndUpdate(id,{class_name:'12345'});
  totalClass.exec((err,data)=>{
    if(err) throw err;
    res.send(data);
  });
});


router.get('/room',function(req, res, next) {
  var teacher_id  = 100;
  console.log(teacher_id);console.log(teacher_id);console.log(teacher_id);console.log(teacher_id);
  var exist_id=1234567890;
    var class_name=224165;
    var subject_name="saw24d66tfsw";
    var teacherAdminClass=teacherModule.findOne({teacher_uid:teacher_id});
    teacherAdminClass.exec(function(err,data){
      if(err) throw err;
      var ObjectId_id = data._id;
      
    var teacherAdminClassDelete=classModule.findOneAndDelete({teacher_id:teacher_id});
    teacherAdminClassDelete.exec(function(err){
      if(err) throw err;
      var userStudent=studentUserModule.findOneAndDelete({student_id:teacher_id});
      userStudent.exec(function(err){
      if(err) throw err;
      var UdtTeacherProfile= teacherModule.findByIdAndUpdate(ObjectId_id,{exist_id:exist_id});
      UdtTeacherProfile.exec(function(err,data){
      if(err) throw err;
      });
      var UdtTeacherProfile= teacherModule.findByIdAndUpdate(ObjectId_id,{class_name:class_name});
      UdtTeacherProfile.exec(function(err,data){
      if(err) throw err;
      });
      var UdtTeacherProfile= teacherModule.findByIdAndUpdate(ObjectId_id,{subject_name:subject_name});
      UdtTeacherProfile.exec(function(err,data){
      if(err) throw err;
      });
      res.send({redirectTo:'/dashboard'});
      });
    });
  });
         
});

module.exports = router;