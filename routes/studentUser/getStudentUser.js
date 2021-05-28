var express = require('express');
var router = express.Router();
var studentUserModule=require('../../modules/studentUser');
var classModule=require('../../modules/class');


var bcrypt =require('bcryptjs');
const { check, validationResult } = require('express-validator');


function checkStuId(req,res,next){
  var student_id=req.body.student_id;
  var checkUser=studentUserModule.findOne({student_id:student_id});
  checkUser.exec((err, data)=>{ 
    if(err) throw err; 
    if(data==null){
  return res.send({redirectTo: 'invalid login'});
    }
    next();
  });
}

function checkStuName(req,res,next){
  var student_name=req.body.student_name;
  var student_id=req.body.student_id;
  var checkUser=studentUserModule.findOne({student_id:student_id});
  checkUser.exec((err, data)=>{ 
    if(err) throw err;
    var stu_name=data.student_name; 
    if(student_name!==stu_name){
  return res.send({redirectTo: 'user name wrong'});
    }
    next();
  });
}

function checkStuStatus(req,res,next){
  var student_id=req.body.student_id;
  var chekUser=studentUserModule.findOne({student_id:student_id});
  chekUser.exec((err,data)=>{
      if(err) throw err;
      var status = data.status;
      if(status=="disabled"){
        return res.send({redirectTo: 'Please Contact School Staff'});
      }
     next();
  });
}

router.get('/:id', function(req, res) {
  var teacher_id = req.params.id;
  var getClass=classModule.findOne({teacher_id:teacher_id});
  getClass.exec(function(err,data){
  if(err) throw err;
  res.render('studentUserLogin', { title: 'Password Management System' }); 
  });

    router.post('/'+teacher_id+'/post',checkStuId,checkStuStatus,checkStuName,function(req,res) {
    var student_id=req.body.student_id;
    var password=req.body.password;
    var checkUser=studentUserModule.findOne({student_id:student_id});
    checkUser.exec((err, data)=>{
      var studentClass = data.class_name;
      var getPassword=data.password;
      if(bcrypt.compareSync(password,getPassword)){  
        var getClass=classModule.findOne({teacher_id:teacher_id});
        getClass.exec(function(err,data){
          var teacherClass = data.class_name;
          var room_id = data.room_id;
          if(studentClass==teacherClass){
            res.send({redirect: '/room/'+room_id});
          }else{
            res.send({redirectTo: 'incorrect Class'});
          }
        }); 
      }else{
        res.send({redirectTo: 'incorrect password'});
      }
    });
  });

});

module.exports = router;