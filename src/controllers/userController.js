import db from "../models/index"
import userService from "../services/userService";

let handleLogin = async(req, res)=>{
    let email = req.body.email;
    let pass = req.body. password;

    if(!email || !pass){
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter'
        })
    }
    let userData = await userService.handleUserLogin(email,pass)

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    });
}
let handleGetAllUser = async(req, res)=>{
   let id = req.query.id;
   if(!id){
    return res.status(200).json({
        errCode:1,
        Message:'Missing required parementers',
        user:[]
   })
   }
   let users = await userService.getAllUser(id)

   return res.status(200).json({
        errCode:0,
        Message:'Ok',
        users
   })
}
module.exports = {
    handleLogin,
    handleGetAllUser
}