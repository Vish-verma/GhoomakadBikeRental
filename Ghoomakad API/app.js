//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser=require('body-parser');
var cors=require('cors');
var path=require('path');

var app=express();

const route = require('./routes/route');

//connect to mongoDB
mongoose.connect('mongodb://localhost:27017/ghoomakadDB',{useNewUrlParser: true})

//On connection
mongoose.connection.on('connected',()=>{
    console.log('connected to DB')
})

mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('Error in DB connection'+err)
    }
})
//port no.
const port = 3000

//static files
app.use(express.static(path.join(__dirname,'public')));

//adding middleware
app.use(cors());

//adding body-parser
app.use(bodyparser.json());


app.use('/api',route);

//testing server
app.get('/',(req,res)=>{
    res.send('foobar')
});

app.listen(port,()=>{
    console.log("server started");
});