var express = require('express');
var router = express.Router();
var teacherModule=require('../modules/teacher');

var classModule=require('../modules/class');



const { check, validationResult } = require('express-validator');
router.use(express.static('public'))

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));


router.get('/',function(req, res, next) {
  var getTeacher= teacherModule.find({});
  getTeacher.exec(function(err,data){
    if(err) throw err;
    
        res.render('dashboard', { title: 'TechBista Solutions',records:data});
      
  });
});

  module.exports = router;

  