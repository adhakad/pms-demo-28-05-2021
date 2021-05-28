const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/abc', {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true,useFindAndModify:false,});
var conn =mongoose.Collection;
var totalAdminClassSchema =new mongoose.Schema({
    
    class_name: {type:Number, 
        },        
});

var totalAdminClassModel = mongoose.model('totalAdminClass', totalAdminClassSchema);
module.exports=totalAdminClassModel;

//mongodb+srv://abhishek_dhakad:Aa1Bb2Hh3@cluster0.fxygu.mongodb.net/<dbname>?retryWrites=true&w=majority