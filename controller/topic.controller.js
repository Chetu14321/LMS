const TopicModel = require('../model/course');
const { StatusCodes } = require('http-status-codes');
//read All
const readAllTopic=async(req,res)=>{
   
}

//read single
const readSingleTopic=async(req,res)=>{
    try{
        res.json({msg:"read single Topic"})

    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
    }
}

//create courses
const createTopic=async(req,res)=>{
    try {
        const topic = new TopicModel(req.body);
        await topic.save();
        res.status(StatusCodes.CREATED).json({msg:"Topic created successfully",topic});
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
}



//update course

const updateTopic=async(req,res)=>{
    try{
        res.json({msg:"update Topic"})

    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
    }
}

//delete

const deleteTopic=async(req,res)=>{
    try{
        res.json({msg:"delete Topic"})

    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
    }
}


module.exports={readAllTopic,readSingleTopic,createTopic,updateTopic,deleteTopic}