//import express
const express = require('express');

//import cors

const cors = require('cors');

//import logic file

const logic = require('./service/logic');


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
server.get('/getuser/:acno',(req,res) => {
    logic.getUser(req.params.acno).then(result =>{
        res.status(result.statusCode).json(result)
    })
})

//balance -- get

server.get('/userbalance/:acno',(req,res) => {
    logic.userBalance(req.params.acno).then(result => {
        res.status(result.statusCode).json(result);
    })
})

//money transfer -- post
//account statement -- get
//account delete -- delete
