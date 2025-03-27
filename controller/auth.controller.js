const {StatusCodes}=require("http-status-codes")

const UserModel = require("../model/user")
const bcrypt = require("bcryptjs")


const regController=async(req,res)=>{
    try{
        let {name,email,password,mobile}=req.body


       
        //validate
        let extUser=await UserModel.findOne({email})
        if(extUser){
            return res.status(StatusCodes.CONFLICT).json({msg:`User ${email} exist`})
        }


         //encrypt password
        let hashedPassword = await bcrypt.hash(password, 10)

        let newuser= await UserModel.create({
            name,
            email,
            password: hashedPassword,
            mobile
        })
        res.status(StatusCodes.ACCEPTED).json({msg:" user rigister successfully",user: newuser})
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message});
    }
}
const loginController=async(req,res)=>{
    try{
        res.json({msg:"login"})
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message});
    }
}
const logoutController=async(req,res)=>{
    try{
        res.json({msg:"logout"})

    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message});
    }
}
const verifyController=async(req,res)=>{
    try{
        res.json({msg:"verify"})
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message});
    }
}
const forgotPassController=async(req,res)=>{
    try{
        res.json({msg:"forgot password"})
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message});
    }
}
const updatePassController=async(req,res)=>{
    try{
        res.json({msg:"update password sucessfully"})
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message});
    }
}

module.exports={regController,loginController,verifyController,forgotPassController,updatePassController,logoutController}













