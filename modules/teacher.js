const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/abc', {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true,useFindAndModify:false,});
var conn =mongoose.Collection;
var teacherSchema =new mongoose.Schema({
    teachername:{type:String,
    },
 
    teacher_uid:{type:Number,
        index:{
            unique:true
        },
    },
    exist_id:{type:Number,},
    
    image:String,
    class_name: {type:Number,},       
    subject_name: {
        type:String, 
        },

    email: {
        type:String, 
        required: true,
        index: {
            unique: true, 
        },},
    password: {
        type:String, 
        required: true
    },
    teacher_status:{type:String,
    },
    class_teacher_status:{type:String,
    },
    date:{
        type: Date, 
        default: Date.now }
});

var teacherModel = mongoose.model('teacher', teacherSchema);
module.exports=teacherModel;
//mongodb+srv://abhishek_dhakad:Aa1Bb2Hh3@cluster0.fxygu.mongodb.net/<dbname>?retryWrites=true&w=majority

