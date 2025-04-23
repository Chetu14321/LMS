const mongoose=require('mongoose')

const topicSchema=new mongoose.Schema({
    topic_title:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    topic_description:{
        type:String,
        default:""
    },
    courseId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    courseName:{
        type:String,
        required:true
    }
,
    catagory:{
        type:String,
        enum:["article","video","audio","document"],
        required:true
    },
    content:{
        type:String,
        required:true
    },
    isActive: {type:Boolean, default:true}

},{
    collection:"topic",
    timestamps:true
})
module.exports=mongoose.model("topic",topicSchema)

