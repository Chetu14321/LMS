
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
const updateCourse = async (req, res) => {
    try {
        const id = req.params.id;
        const exCourse = await CourseModel.findById(id);
        if (!exCourse)
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "Requested course not found" });

        const updatedCourse = await CourseModel.findByIdAndUpdate(id, req.body, { new: true });

        res.status(StatusCodes.OK).json({ msg: "Course updated successfully", course: updatedCourse });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
};

//delete
const deleteCourse = async (req, res) => {
    try {
        const id = req.params.id;
        const exCourse = await CourseModel.findById(id);
        if (!exCourse)
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "Requested course not found" });

        await CourseModel.findByIdAndDelete(id);

        res.status(StatusCodes.OK).json({ msg: "Course deleted successfully" });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
};


module.exports={readAllCourse,readSingleCourse,createCourse,updateCourse,deleteCourse}