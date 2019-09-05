const mongoose=require('mongoose');

const OfferSchema=mongoose.Schema({
    couponCode:{
        type:String,
        required:true 
    },
    discount:{
        type:Number,
        required:true
    },
    expirationDate:{
        type:Date,
        required:true
    }
});

const Offer = module.exports = mongoose.model('Offer',OfferSchema)