
const {readAllTopic,readSingleTopic,createTopic,updateTopic,deleteTopic, readTopicid,getTopicsByCourse}=require("../controller/topic.controller")
const TopicRoute=require("express").Router()


TopicRoute.post("/add",createTopic)

TopicRoute.get("/all",readAllTopic)

TopicRoute.get('/single/:id',readSingleTopic)

TopicRoute.patch('/update/:id',updateTopic)

TopicRoute.delete('/delete/:id',deleteTopic)
// TopicRoute.get('/course/:courseId',readTopicid)

TopicRoute.get('/course/:courseId', getTopicsByCourse);



module.exports=TopicRoute