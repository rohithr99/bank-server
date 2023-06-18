// import model
const database = require('./datab');
const jwt = require('jsonwebtoken');

//register logic
 
register = (acno, passwd, username) =>{
    return database.User.findOne({acno : acno}).then(user => {
        if(user){
            return {
                message:"user already present",
                status:false,
                statusCode:404
            };
        }
        else{
            newuser = new database.User({
                acno : acno,
                username:username,
                passwd:passwd,
                balance:0,
                transaction:[]
            });
            //to reflect the changes done by server in database
            newuser.save();
            return {
                message:"registered successfully",
                status:true,
                statusCode:200
            };
        }
    })
}

login = (acno,passwd) =>{
    return database.User.findOne({acno : acno,passwd: passwd}).then(user => {
        if(user){

            //token generation
            const token = jwt.sign({acno},"bankKey123");

            return {
                message: "login success",
                status: true,
                statusCode: 200,
                currentUser:user.username,
                currentAcno:acno,
                token
            }
        }
        else{
            return {
                message:"incorrect acno or password",
                status:false,
                statusCode: 404
            }
        }
    })
}

getUser = (acno) => {
    return database.User.findOne({acno}).then(user => {
        if(user){
            return {
                message : user,
                status : true,
                statusCode : 200
            }
        }else{
            return {
                message : "user not found",
                status : false,
                statusCode : 404
            }
        }
    })
}

userBalance = (acno) => {
    return database.User.findOne({acno}).then(user => {
        if(user){
            return {
                message : user.balance,
                status :true,
                statusCode : 200
            }
        }
        else{
            return {
                message : "user not found",
                status : false,
                statusCode : 404
            }
        }
    })
}

moneyTransfer = (fromAcno, toAcno,amount, passwd, date) => {
    return database.User.findOne({acno:fromAcno,passwd}).then(fromUser => {
        if(fromUser){
           return database.User.findOne({acno: toAcno}).then(toUser => {
                if(toUser){
                    amount = parseInt(amount); // for converting coming string to a number 
                    if(amount > fromUser.balance){
                        return {
                            message: "insufficient balance",
                            status:false,
                            statusCode:404
                        }
                    }else{
                        //updating from acc
                        fromUser.balance -= amount;
                        fromUser.transaction.push({type:'DEBIT',amount,date});
                        fromUser.save();

                        //updating to Acc
                        toUser.balance += amount;
                        toUser.transaction.push({type:'CREDIT',amount,date});
                        toUser.save();

                        return {
                            message:'transaction successful',
                            status:true,
                            statusCode:200
                        }
                    }
                }else{
                    //no to user acc found
                    return {
                        message:'invalid credit credential',
                        status:false,
                        statusCode:404
                    };

                }
            })
        }else{
            //no from user acc found
            return {
                message:'invalid debit credentials',
                status: false,
                statusCode:404
            };
        }
    })
}

getTransaction = (acno) => {
    return database.User.findOne({acno}).then(user => {
        if(user){
            return {
                message:user.transaction,
                status: true,
                statusCode: 200
            }
        }else{
            return {
                message:"user does not exist",
                status: false,
                statusCode: 404
            }
        }
    })
}



//export
module.exports= {
    register, login ,getUser ,userBalance ,moneyTransfer ,getTransaction
};