const {StatusCodes}=require("http-status-codes")
const mailHandler = require("../config/mail")//importing mail configaration
const UserModel = require("../model/user")
const bcrypt = require("bcryptjs")
const genarateToken = require("../util/token")

// rigister
const regController=async(req,res)=>{
    try{
        let {name,email,password,mobile}=req.body

        //validate
        let extUser=await UserModel.findOne({email})
        if(extUser){
            return res.status(StatusCodes.CONFLICT).json({msg:`User ${email} exist`})
        }
         //encrypt password
        let hashedPassword = await bcrypt.hash(password, 10)
 

        //save the data into db
        let newuser= await UserModel.create({
            name,
            email,
            password: hashedPassword,
            mobile
        })

        let temp=`<div>
        
        
                <h1>Hi ${name} ,Thank You for registering in our portal</h1>
        
                <table>
                <tr>    
                    <td>Name</td>
                    <td>Email</td>
                    <td>Mobile</td>
                
                
                </tr>

                <tr>
                    <td>${name}</td>
                    <td>${email}</td>
                    <td>${mobile}</td>
                
                </tr>
                <hr>



                <h5>Reagards,</h5>
                <p> Team Chethan</p>
                </table>
        
        
        
        </div>`

        await mailHandler(email,"user Registration",temp)//email configuration while sending the welcome message
        .then(out=>{
            res.status(StatusCodes.ACCEPTED).json({msg:" user rigister successfully",user: newuser})

        }).catch(err=>{
            return res.status(StatusCodes.CONFLICT).json({msg:err.message})
        })
       
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message});
    }
}


// login
const loginController=async(req,res)=>{
    try{

    let {email,password}=req.body
        //verify the emailid
        let exUser=await UserModel.findOne({email})
        if(!exUser)
            return res.status(StatusCodes.NOT_FOUND).json({msg:`User ${email} not found`})

        //verify password

        let veriftPass= await bcrypt.compare(password,exUser.password)
        if(!veriftPass)
            return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Invalid password"})

        //login token
        let token=await genarateToken(exUser._id)

        //cookie

        res.cookie("login_token",token,{
            httpOnly:true,
            signed:true,
            path: "/",
            expires:new Date(Date.now()+1000*60*60*24*30)
        })


        res.json({msg:"login successful", token,role:exUser.role})
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message});
    }
}

//logout
const logoutController=async(req,res)=>{
    try{
        res.clearCookie("login_token",{path:"/"})//clear the cookie
        res.json({msg:"logout successfully"})

    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message});
    }
}

//verify


const  verifyController = async (req,res) => {
    try {
        let id = req.userId 

        // verify the user
        let exUser = await UserModel.findById({_id: id }).select("-password")
            if(!exUser)
                return res.status(StatusCodes.NOT_FOUND).json({ msg: `request user id not found..`})
        

        res.json({ msg: "verified successful", user: exUser })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message })
    }
}
const forgotPassController=async(req,res)=>{
    try{
        let {email}=req.body;
        //verify the emailid
        let exUser=await UserModel.findOne({email})
        if(!exUser)
            return res.status(StatusCodes.NOT_FOUND).json({msg:`User ${email} not found`})
        //generate random password

        //send an email to the user to update the password
        let num =Math.floor(100000+Math.random()*999999)

        let template=`<div>
                       <h1>${exUser.name} , we proccesed the rewuest for  genatring the new password.....</h1>
                       <h3>OTP: <strong><mark>${num}</mark></strong></h3> 
                      </div>`
        await UserModel.findOneAndUpdate({email},{otp:num})

        //send email to user and store the otp
        await mailHandler(exUser.email,"Reset Password",template)
        .then(out=>{
            res.status(StatusCodes.OK).json({msg:"Otp successfully....sent check your email inbox...."})
        })
        .catch(err=>{
             return res.json(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
        })
    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message});
    }
}

//update password
const updatePassController = async (req, res) => {
    try {
        let { email, password, otp } = req.body;

        // verify the email id
        let exUser = await UserModel.findOne({ email });
        if (!exUser)
            return res.status(StatusCodes.NOT_FOUND).json({ msg: `User ${email} not found` });

        // compare OTP
        if (exUser.otp !== otp)
            return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid otp....." });

        // compare with existing password
        let cmpPass = await bcrypt.compare(password, exUser.password);
        if (cmpPass)
            return res.status(StatusCodes.CONFLICT).json({ msg: "Password can't be same as old password" });

        // update the password
        let encpass = await bcrypt.hash(password, 10);
        await UserModel.findOneAndUpdate(
            { email },
            {
                password: encpass,
                otp: 0
            }
        );

        res.status(StatusCodes.OK).json({ msg: "Password updated successfully" });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
};

module.exports={regController,loginController,verifyController,forgotPassController,updatePassController,logoutController}













