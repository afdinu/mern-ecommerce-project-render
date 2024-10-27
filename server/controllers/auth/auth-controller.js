const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User.js")




// register
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.json({ success: false, message: "User already exists with same email, pls try again" })
            console.log(user.message)
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const newuser = new User({ userName, email, password: hashPassword });
        await newuser.save();
        return  res.status(200).json({ success: true, message: "Registeration is successful" })

    } catch (error) {
        console.log(error);
        return  res.status(500).json({ success: false, message: "server error" });
    }

}




//login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.json({ success: false, message: "User not found, Please register first" })
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.json({ success: false, message: "Incorrect Password...!!! pls try again" })

        };
        const token = jwt.sign({
            id: user._id, role: user.role, email: user.email,userName : user.userName
        }, "CLIENT_SECRET_KEY", { expiresIn: "6000m" });
        res.cookie("token", token, { httpOnly: true, secure: false,maxAge:360000000 }).json({success: true, message: "Logged in successful",
            user: {
                email: user.email,
                role: user.role,
                id: user._id,
                userName : user.userName
            }
        }
        )

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "server error" });
    }

}




// logout

const logoutUser = async(req,res)=>{
    res.clearCookie("token").json({
        success: true,
        message: "Logged out successfully"
    })
}


// authmiddleware
const authmiddleware= async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unauthorised user!"
        })
    }
    try{
        const decoded= await jwt.verify(token,"CLIENT_SECRET_KEY")
        req.user=decoded
        next()

    }catch(error){
  
        return res.status(401).json({
            success:false,
            message:"Unauthorised user!"})
    }
}



module.exports = { registerUser, loginUser,logoutUser ,authmiddleware}