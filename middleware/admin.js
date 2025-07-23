const { StatusCodes } = require("http-status-codes")
const UserModel=require('../model/user')

 const adminAuth=async(req,res,next)=>{
    try{
        let id=req.userId

        //read the user

        let exUser=await UserModel.findById(id)
        if(!exUser)
            return res.status(StatusCodes.NOT_FOUND).json({msg:`req user id not found`})

        //validate the role

        if(exUser.role!=="admin")
            return res.status(StatusCodes.UNAUTHORIZED).json({msg:`unauthorized to acess the requested path`})
        next()
            


    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
    }
}
module.exports = adminAuth;
 