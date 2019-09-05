const mongoose=require('mongoose');

const BikeBookingSchema=mongoose.Schema({
    bId:{
        type:String,
        required:true
    },
    bookedFrom:{
        type:Date,
        required:true
    },
    bookedTill:{
        type:Date,
        required:true
    },
    bill:{
        type:Number,
        required:true
    },
    referenceNo:{
        type:String,
        required:true
    },
    isPaid:{
        type:Boolean,
        required:true
    }
});

const BikeBooking = module.exports = mongoose.model('BikeBooking',BikeBookingSchema)