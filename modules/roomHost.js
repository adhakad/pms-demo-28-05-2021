const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/abc', {useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true,useFindAndModify:false,});
var conn =mongoose.Collection;
var roomHostSchema =new mongoose.Schema({
    room_id: {
        type:Number, 
        },
    roomH_id: {type:String, 
        },        
});

var roomHostModel = mongoose.model('roomHost', roomHostSchema);
module.exports=roomHostModel;