const TopicModel = require('../model/topic');
const { StatusCodes } = require('http-status-codes');
//read All
const readAllTopic = async (req, res) => {
    try {
        const topics = await TopicModel.find();
        res.status(StatusCodes.OK).json({
            length: topics.length,
            topics,
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
};



// Read single topic by ID
const readSingleTopic = async (req, res) => {
    try {
      const { id } = req.params;  // Get the id from the URL parameter
      const singleTopic = await TopicModel.findOne(id);  // Find the topic using the id
      if (!singleTopic) {
        return res.status(404).json({ msg: 'Topic not found' });
      }
      res.status(200).json({ msg: "Read single topic successfully", singleTopic });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  };


//create topic
const createTopic=async(req,res)=>{
    try {
        const topic = new TopicModel(req.body);
        await topic.save();
        res.status(StatusCodes.CREATED).json({msg:"Topic created successfully",topic});
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
}



//topic update
const updateTopic = async (req, res) => {
    try {
        const id = req.params.id;
        const exTopic= await TopicModel.findById(id);
        if (!exTopic)
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "Requested Topic not found" });

        const updatedTopic = await TopicModel.findByIdAndUpdate(id, req.body, { new: true });

        res.status(StatusCodes.OK).json({ msg: "Course updated successfully", topic: updatedTopic });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
};

//delete

const deleteTopic=async(req,res)=>{
    try{

        const {id}=req.params
        const exTopic=await TopicModel.findById(id)
        if(!exTopic)
            return res.status(StatusCodes.NOT_FOUND).json({msg:"topic not found"})
        const DeleteTopic=await TopicModel.findByIdAndDelete(id,req.body,{new:true})
        res.status(StatusCodes.OK).json({msg:"delete Topic successfully",DeleteTopic})

    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
    }
}


module.exports={readAllTopic,readSingleTopic,createTopic,updateTopic,deleteTopic}