//read All
const readAllTopic=async(req,res)=>{
    try{
        res.json({msg:"read ALl Topic"})

    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
    }
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
    try{
        res.json({msg:"create Topic"})

    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
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