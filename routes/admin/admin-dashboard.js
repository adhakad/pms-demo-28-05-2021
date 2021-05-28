var express = require('express');
var router = express.Router();
const classTeacherModel = require('../../modules/classTeacher');
var teacherModule=require('../../modules/teacher');
var getTeacher= teacherModule.find({});


const { check, validationResult } = require('express-validator');
router.use(express.static('public'))

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));



router.get('/',function(req, res, next) {
  getTeacher.exec(function(err,data){
    if(err) throw err;
    res.render('admin-dashboard', { title: 'TechBista Solutions'});
  });
});


router.get('/get', function(req, res) {
  var getTeacher= teacherModule.find({});
  getTeacher.exec(function(err,data){
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
  var teacher=teacherModule.findByIdAndDelete({_id:id});
  teacher.exec((err,data)=>{
    if(err) throw err;
    if(err){
      res.send({msg:'error'});
    }else{
      res.send({msg:'success'});
    }
  }); 
});

router.put('/enable_t_status',function(req, res, next) {
  var id = req.body.id;
  var teacherUpdate=teacherModule.findByIdAndUpdate(id,{teacher_status:'enabled'});
  teacherUpdate.exec((err,data)=>{
    if(err) throw err;
    res.send(data);
  });
});

router.put('/disable_t_status',function(req, res, next) {
  var id = req.body.id;
  var teacherUpdate=teacherModule.findByIdAndUpdate(id,{teacher_status:'disabled'});
  teacherUpdate.exec((err,data)=>{
    if(err) throw err;
    res.send(data);
  });
});

router.put('/active_c_t_status',function(req, res, next) {
  var id = req.body.id;
  var teacherUpdate=teacherModule.findByIdAndUpdate(id,{class_teacher_status:'active'});
  teacherUpdate.exec((err,data)=>{
    if(err) throw err;
    res.send(data);
  });
});





router.put('/inactive_c_t_status',function(req, res, next) {
  var id = req.body.id;
  classTeacher=teacherModule.findOne({_id:id});
  classTeacher.exec((err,result)=>{
    var teacher_uid=result.teacher_uid;
    clsTeacher=classTeacherModel.find({teacher_uid:teacher_uid});
    clsTeacher.exec((err,results)=>{
      if(results==null){
        var teacherUpdate=teacherModule.findByIdAndUpdate(id,{class_teacher_status:'inactive'});
        teacherUpdate.exec((err,data)=>{
          if(err) throw err;
          res.send(data);
        });
      }else{
        var teacherUpdate=teacherModule.findByIdAndUpdate(id,{class_teacher_status:'inactive'});
        teacherUpdate.exec((err,data)=>{
          if(err) throw err;
          if(results.length > 0){
            results.forEach(function(row){
              var objid=row._id;
              Teacher=classTeacherModel.findByIdAndDelete(objid);
              Teacher.exec((err)=>{
              });
            }) 
          }
          res.send(data);
        });
      }
    });
  });
});


  module.exports = router;