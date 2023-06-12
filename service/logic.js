// import model
const database = require('./datab');

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
            return {
                message: "login success",
                status: true,
                statusCode: 200,
                currentUser:user.username,
                currentAcno:acno
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

//export
module.exports= {
    register, login ,getUser ,userBalance
};