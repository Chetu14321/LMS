const mongoose = require('mongoose')


const UserSchema=new mongoose.Schema({
    name: {type:String, required:true,trim:true},
    email: {type:String, required:true, unique:true, trim:true},
    mobile: {type:String, required:true, unique:true},
    password: {type:String, required:true ,trim:true},
    role: {type:String, enum:["user","admin"],default:'user'},
    isActive: {type:Boolean, default:true}
  
},{
    collection:"users",
    timestamps:true,

})

module.exports=mongoose.model('UserModel',UserSchema)