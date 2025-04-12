
const CourseModel = require('../model/course');
const { StatusCodes } = require('http-status-codes');

// CREATE
const createCourse = async (req, res) => {
    try {
        const course = new CourseModel(req.body);
        await course.save();
        res.status(StatusCodes.CREATED).json({msg:"course created successfully",course});
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
};

//read All
const readAllCourse=async(req,res)=>{
    try{
        let courses=await CourseModel.find()
        res.json({lenght:courses.lenght,courses})

    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
    }
}

const readSingleCourse = async (req, res) => {
    try {
        const course = await CourseModel.findById(req.params.id);
        if (!course) 
            return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Course not found' });
        res.status(StatusCodes.OK).json({msg:"course is successfully fetched",course});
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
};





//update course

const updateCourse=async(req,res)=>{
    try{
        let id=req.params.id
        let exCoures=await CourseModel.findById(id)
        if(!exCoures)
            return res.status(StatusCodes.NOT_FOUND).json({msg:"requested course not found"})

        await CourseModel.findByIdAndUpdate({_id:id},req.body)


    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
    }
}

//delete

const deleteCourse=async(req,res)=>{
    try{
        let id=req.params.id
        let exCoures=await CourseModel.findById(id)
        if(!exCoures)
            return res.status(StatusCodes.NOT_FOUND).json({msg:"requested course not found"})
        await CourseModel.findByIdAndDelete({_id:id},req.body)

    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
    }
}


module.exports={readAllCourse,readSingleCourse,createCourse,updateCourse,deleteCourse}