const mongoose=require('mongoose');

const CustomerDetailsSchema=mongoose.Schema({
    cId:{
        type:int,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    contact:{
        type:int,
        size:10,
        required:true
    },
    dob:{
        type:Date,
        required:true
    }
});

const CustomerDetails = module.exports = mongoose.model('CustomerDetails',CustomerDetailsSchema)