const mongoose=require('mongoose');

const BikeInfoSchema=mongoose.Schema({
    bName:{
        type:String,
        required:true
    },
    cc:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    rate:{
        type:Number,
        required:true
    }
});
const BikeInfo = module.exports = mongoose.model('BikeInfo',BikeInfoSchema)
