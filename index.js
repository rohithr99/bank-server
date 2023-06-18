//import express
const express = require('express');

//import cors

const cors = require('cors');

//import logic file

const logic = require('./service/logic');

//import jsonwebtoken
const jwt = require('jsonwebtoken');


//server creation
const server = express();  
// to reuse the server we are storing it in a variable named server


//incoming json type data convert to js
server.use(express.json());

//connect front-End
server.use(cors({origin: 'http://localhost:4200'}));


//set port 
server.listen(8000,() => {
    console.log("_server started at port 8000");
});


const tokenMiddleware = (req,res,next) => {
    //to avoid run time errors we use try catch
    try{
        const token = req.headers["access_token"];
        jwt.verify(token,"bankKey123");
        next();
    }catch{
        res.status(404).json({
            message: "token not verified",
            status: false,
            statusCode: 404
        })
    }
}

// //server api resolve
// server.post('/getexample',(req, res) => {
//     res.send('post request');
// })

//register -- post
server.post('/register',(request,response)=>{
    logic.register(request.body.acno,request.body.passwd,request.body.username).then(result => {
        //convert javascript to json and send as response
        response.status(result.statusCode).json(result);
    });
});


//login -- post

server.post('/login',(req,res) =>{
    logic.login(req.body.acno,req.body.passwd).then(result => {
        res.status(result.statusCode).json(result)
    })
})

//get user data -- get
server.get('/getuser/:acno',tokenMiddleware,(req,res) => {
    logic.getUser(req.params.acno).then(result =>{
        res.status(result.statusCode).json(result)
    })
})

//balance -- get

server.get('/userbalance/:acno',tokenMiddleware,(req,res) => {
    logic.userBalance(req.params.acno).then(result => {
        res.status(result.statusCode).json(result);
    })
})

//money transfer -- post
server.post('/transfer',tokenMiddleware,(request,response) => {
    logic.moneyTransfer(
        request.body.fromAcno,
        request.body.toAcno,
        request.body.amount,
        request.body.passwd,
        request.body.date
    ).then(result => {
        response.status(result.statusCode).json(result)
    })
})

//account statement -- get
server.get('/history/:acno',tokenMiddleware,(req,res) => {
    logic.getTransaction(req.params.acno).then(result => {
        res.status(result.statusCode).json(result);
    })
})

//account delete -- delete
