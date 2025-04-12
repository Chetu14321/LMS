const mongoose=require('mongoose')

const topicSchema=new mongoose.Schema({
    topic_title:{
        type:string,
        unique:true,
        trim:true,
        required:true
    },
    topic_description:{
        type:string,
        default:""
    },
    courseId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },

    catagory:{
        type:string,
        enum:["article","video","audio","document"],
        required:true
    },
    content:{
        type:string,
        required:true
    },
    isActive: {type:Boolean, default:true}

},{
    collection:"topic",
    timestamps:true
})
module.exports=mongoose.model("topic",topicSchema)

