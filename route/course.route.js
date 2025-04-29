const { SiSinglestore } = require("react-icons/si")
const {readAllCourse,readSingleCourse,createCourse,updateCourse,deleteCourse}=require("../controller/course.controller")
const courseRoute=require("express").Router()
// const authMiddleware=require("../middleware/auth")
// const adminAuth=require("../middleware/admin")


// courseRoute.post(`/add`,authMiddleware,adminAuth,createCourse)
courseRoute.post(`/add`,createCourse)

courseRoute.get("/all",readAllCourse)

courseRoute.get('/single/:id',readSingleCourse)

courseRoute.patch('/update/:id',updateCourse)

courseRoute.delete('/delete/:id',deleteCourse)

module.exports=courseRoute