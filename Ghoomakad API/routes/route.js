const express = require('express');
const router = express.Router();

const Customer = require('../models/Customer');
const Bike = require('../models/bikeInfo');
const BookingInfo = require('../models/bikeBooking');
const Offer = require('../models/offers');

router.post('/login',(req,res,next)=>{
    if(!req.body.email || !req.body.password){
        res.send("Error in Credentials");
    }
    else{
        //debugger;
        let result=Customer.findOne({emailId:req.body.email,password:req.body.password},(err,customer)=>{
            debugger;
            if(err) res.end("Error");
            //res.setHeader('Content-Type', 'text/plain');
            //res.setHeader('Content-Type', 'application/json');
            else if (customer===null){
                res.json({id:0,msg:"invalid credentials"});
            }
            else res.json({id:customer.id,msg:"Login Successful"});
        });
    }
});

//GetCustomer
router.get('/test:id',(req,res,next)=>{
    //console.log(req.params)
    //let found=
    Customer.findOne({_id:req.params.id},'emailId',{lean:true},(err,user)=>{
        console.log("Inside"+user);
    });
    //(err,user)=>{
    //     debugger;
    //     if(err){
    //         res.json({msg:"US"})
    //     }
    //     res.json({use:user,msg:"SS"})
    // });
    console.log(user);
    res.json({use:user,msg:"SS"});
    //console.log(found);
});

//add customer
router.post('/customer',(req,res,next)=>{
    //logic to add Customer
    let newCustomer = new Customer({
        emailId:req.body.email,
        password:req.body.password,
        name:req.body.name,
        contact:req.body.contact,
        dob:req.body.dob,
    });
    newCustomer.save((err,Customer)=>{
        if(err){
            res.json({msg :' Failed to add contact'});
        }
        else{
            res.json({msg:'Customer added successfully'});
        }
    })

});

//Get all Bikes
    router.get('/bikes',(req,res,next)=>{
        
        Bike.find({},(err,bike)=>{
            if(err){
                res.json({bikes:null,msg:'could not fecth Bikes'});
            }
            res.json({bikes:bike,msg:'Successfull'});
        })
    })
// Get Available Bikes
    // router.get('/availablebikes',(req,res,next)=>{
    //     Bike.find({},(err,bike)=>{
    //         if(err){
    //             res.json({bikes:null,msg:"Unsuccesful"});
    //         }
    //         res.json({bikes:bike,msg:"Successfull"});
    //     });
    // });
    
//add Bikes
router.post('/addBike',(req,res,next)=>{
    //logic to add Customer
    let newBike = new Bike({
        bName:req.body.bName,
        cc:req.body.cc,
        quantity:req.body.quantity,
        rate:req.body.rate
    });
    newBike.save((err,Bike)=>{
        if(err){
            res.json({msg :' Failed to add Bike'});
        }
        else{
            res.json({msg:'Bike added successfully'});
        }
    })

});

//Get my Bike Bookings
router.get('/myBikeBooking',(req,res,next)=>{
        
    BookingInfo.find({referenceNo:req.body.id},(err,bookings)=>{
        if(err){
            res.json({booking:null,msg:'could not fecth Bikes'});
        }
        res.json({booking:bookings,msg:'Successfull'});
    })
})

//Booking a bike
router.post('/booking',(req,res,next)=>{
    let newBooking = new BookingInfo({
        bId:req.body.bikeId,
        referenceNo:req.body.uId,
        bookedFrom:req.body.bookedFrom,
        bookedTill:req.body.bookedTill,
        isPaid:req.body.isPaid,
        bill:req.body.bill,
    });
    debugger;
    var bookingsTemp;
    findBookingDetail(newBooking.bId,newBooking.bookedFrom,newBooking.bookedTill).then(function(bookings){
        console.log()
        bookingsTemp = bookings
        return findBikeDetail(newBooking.bId)
    }).then(function(bike){
        return saveBooking(bike,bookingsTemp,newBooking)
    }).then(function(final){
        console.log(final)
        return res.json({msg:final})
    }).catch((err)=>{
        console.log(err)
    })
    // findBookingDetail(newBooking.bId,newBooking.bookedFrom,newBooking.bookedTill)
    //     .then(findBikeDetail)
    //     .then(saveBooking)
    //     .then(()=>{
    //         res.json({msg:"Booking Successfull"});
    //     })
    //     .catch((err)=>{
    //         console.log("error :"+err)
    //         res.json(err);
    //     });
            
});

function findBookingDetail(bikeId,bookedFrom,bookedTill){
    debugger;
    console.log(bikeId,bookedFrom,bookedTill)
    return new Promise((resolve , reject)=>{
        BookingInfo.find({bId:bikeId,bookedFrom:{$gte:bookedFrom},bookedTill:{$lte:bookedTill}},(err,bookings)=>{
            if(err){
                console.log(err);
                reject({msg:"Booking Unsuccessfull"});
            }
            else{
                console.log("found some bookings");
                resolve(bookings);
            }
        });
    });
}
function findBikeDetail(bikeId){
    debugger;
    return new Promise((resolve,reject)=>{
        Bike.findOne({_id:bikeId},(err,bike)=>{
            if(err){
                console.log(err);
                reject({msg:"Booking Unsuccessfull"});
            }
            else
            console.log("found some bike detail");
                resolve(bike);
        });
    });
}

function saveBooking(bike,bookings,newBooking){
    //console.log(bike);
    console.log("IN saveBookings",bookings,bike);
    return new Promise((resolve,reject)=>{
        if(bookings.length < bike.quantity){
            newBooking.save((err,BookingInfo)=>{
                if(err){
                    console.log(err);
                    reject({msg:"Booking Unsuccessfull"});
                }
                else
                console.log("save success");
                    resolve("Booking Successfull");
            });
        }
        else{
            resolve("Not Available");
        }
    });
}

//Adding Offer
router.post('/addoffer',(req,res,next)=>{
    let newOffer = new Offer({
        couponCode: req.body.couponCode,
        discount :req.body.discount,
        expirationDate : req.body.expirationDate
    });
    newOffer.save((err,OfferCode)=>{
        if(err){
            res.json({msg:" Offer Unsuccessfull"});
        }
        else{
        res.json({msg:"Offer Added Successfully"});}
    });
});

//GetAllAvailableOffer
router.get('/availableoffer',(req,res,next)=>{
    var datetime = new Date();
   // console.log(datetime.toISOString());
   Offer.find({expirationDate:{$gte:datetime}},(err,offers)=>{
       if(err){
           res.json({offerlist:null,msg:"offer fetch unsuccessfull"});
       }
       res.json({offerlist:offers,msg:"Fetching Successfull"});
   })

});

// //deleting customer profile
// router.delete('/contact:id',(req,res,next)=>{
//     //logic to delete customer
//     Customer.remove({_id:req.params.id},function(err,result){
//         if(err){
//             res.json(err);
//         }
//         else{
//             res.json(result);
//         }
//     })
// });

module.exports = router;