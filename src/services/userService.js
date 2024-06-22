import db from '../models';
var bcrypt = require('bcryptjs');

let handleUserLogin = (email, pass)=>{
    return new Promise( async(resolve, reject) =>{
        try {
            let userData = {}

            var user = await db.User.findOne({ 
                where: { email: email },
                attributes: ['email','roleId','password'],
            });

            //Ktra email có tồn tại khong
            if(user){
                //So sánh password có giống
                let isCheck = await bcrypt.compareSync(pass, user.password)
                if(isCheck){
                    userData.errCode = 0
                    userData.message = "Ok";
                    delete user.password
                    userData.user = user
                }else{
                    userData.errCode = 3
                    userData.message = "Wrong password"
                }
            }else{
                userData.errCode = 2
                userData.message = "Your email isn't exist in system. Please try other email!"
            }
            resolve(userData)
                  
        } catch (error) {
            reject(error);
        }
    });
}

let getAllUser = (userID)=>{
    return new Promise( async(resolve, reject) =>{
        try {
            let users = ''
            if(userID === 'ALL'){
                users = await db.User.findAll({
                    attributes:{
                        exclude: ['password']
                    },                 
                });
            }
            if(userID && userID !== 'ALL'){
                users = await db.User.findOne({ 
                    where: { id: userID },
                    attributes:{
                        exclude: ['password']
                    },
                });
            }
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    handleUserLogin,
    getAllUser
}