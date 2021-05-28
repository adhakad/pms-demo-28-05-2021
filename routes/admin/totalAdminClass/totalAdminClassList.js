var express = require('express');
var router = express.Router();
var totalAdminClassModule=require('../../../modules/totalAdminClass');
var getTotalAdminClass= totalAdminClassModule.find({});


const { check, validationResult } = require('express-validator');
router.use(express.static('public'))

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));






router.get('/', function(req, res, next) {
    getTotalAdminClass.exec(function(err,data){
    if(err) throw err;
    res.render('admin/totalAdminClass/totalAdminClassList', { title: 'Total Admin Class List', records:data });
  });
});


router.get('/delete/:id', function(req, res, next) {
  var id=req.params.id;
  var teacherDelete=teacherModule.findByIdAndDelete(id);
  teacherDelete.exec(function(err){
    if(err) throw err;
    res.redirect('/teacherList');
  });
});

  module.exports = router;