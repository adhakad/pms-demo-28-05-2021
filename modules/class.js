const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/abc', {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true,useFindAndModify:false,});
var conn =mongoose.Collection;
var classSchema =new mongoose.Schema({
    tObj_id:{
        type:String,
    },
    teacher_id:{type:Number,
        
    },
    class_name: {type:Number,
        
        },        
    subject_name: {
        type:String, 
        },
    room_id: {
        type:Number, 
        },
        password: {
            type:String,
            required: true
        },
    
});

var classModel = mongoose.model('class', classSchema);
module.exports=classModel;

//mongodb+srv://abhishek_dhakad:Aa1Bb2Hh3@cluster0.fxygu.mongodb.net/<dbname>?retryWrites=true&w=majority