const mongoose=require('mongoose');

const CustomerSchema=mongoose.Schema({
    emailId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        size:10,
        required:true
    },
    dob:{
        type:Date,
        required:true
    }
});
const Customer = module.exports = mongoose.model('Customer',CustomerSchema)