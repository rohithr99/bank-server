// import mongoose

const mgoose = require("mongoose");

mgoose.connect('mongodb://127.0.0.1:27017/bankServer');


// model for creation
//collection name here should be singular


//schema means fields and values in model
const User = mgoose.model('User',{
    acno : Number,
    username:String,
    passwd:String,
    balance:Number,
    transaction:[]
});


//export model

module.exports = {
    User
};

