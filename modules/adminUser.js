const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/abc', {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true,useFindAndModify:false,});
var conn =mongoose.Collection;
var adminUserSchema =new mongoose.Schema({
    email:{type:String,
    required:true,
    index:{unique:true},},
    
    password: {
        type:String, 
        required: true
    },
    date:{
        type: Date, 
        default: Date.now }
});

var adminUserModel = mongoose.model('adminUsers',adminUserSchema);
module.exports=adminUserModel;


//'mongodb+srv://abhishek_dhakad:Aa1Bb2Hh3@cluster0.fxygu.mongodb.net/<dbname>?retryWrites=true&w=majority'