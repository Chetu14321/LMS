const authRoute=require('express').Router();

const {regController,loginController,logoutController,verifyController,updatePassController,forgotPassController} =require('../controller/auth.controller')

//register
authRoute.post('/register',regController);

//login
authRoute.post('/login',loginController);

//logout
authRoute.get('/logout',logoutController);

//verify email address
authRoute.get('/verify',verifyController);

//update password
authRoute.patch('/update/Password',updatePassController);

//forgot password request
authRoute.post('/forgot/Password',forgotPassController);


module.exports=authRoute;