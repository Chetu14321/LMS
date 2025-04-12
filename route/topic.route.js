
const {readAllTopic,readSingleTopic,createTopic,updateTopic,deleteTopic}=require("../controller/topic.controller")
const TopicRoute=require("express").Router()


TopicRoute.post("/add",createTopic)

TopicRoute.get("/all",readAllTopic)

TopicRoute.get('/single/:id',readSingleTopic)

TopicRoute.patch('/update/:id',updateTopic)

TopicRoute.delete('/delete/:id',deleteTopic)

module.exports=TopicRoute