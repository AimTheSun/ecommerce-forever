import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";

// ALLOW A USER TO CREATE AN ACCOUNT AND TO LOGIN


const createToken = (id) => {
    return jwt.sign({ id },process.env.JWT_SECRET)
}


// ROUTE FOR USER LOGIN
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        // CHECKING USER ALREADY EXISTS OR NOT
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User Not Found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: "Incorrect Password" });
        }
  
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
     
    console.log("API HIT");
    }

// ROUTE FOR USER REGISTRATION
    const registerUser = async (req,res) => {
    try {
        const {name, email, password} = req.body; // GET THE USER'S DETAILS FROM THE REQUEST BODY

         // CHECKING USER ALREADY EXISTS OR NOT
         const exists = await userModel.findOne({email})
         if (exists) {
             return res.json({success:false, message:"User Already Exists"})
         }
         
         // VALIDATING EMAIL FORMAT & STRONG PASSWORD
         if (!validator.isEmail(email)) {
             return res.json({success:false, message:"Please Enter a Valid Email"})
         }
         if (password.length < 8) {
             return res.json({success:false, message:"Please Enter a Strong Password"})
         }
 
         // HASHING USER PASSWORD
         const salt = await bcrypt.genSalt(10)
         const hashedPassword = await bcrypt.hash(password,salt)
 
         const newUser = new userModel({
             name,
             email,
             password:hashedPassword
         })
        
        // SAVING THE USER TO THE DATABASE
        const user = await newUser.save()


        const token = createToken(user._id) // CREATE A TOKEN FOR THE USER AUTOMATICALLY BY JWT
         res.json({success:true,token})


        } catch (error) {
            console.log(error);
            res.json({success:false,message:error.message})
        }
    }

// ROUTE FOR ADMIN LOGIN
const adminLogin = async (req, res) => {
    // Check if the user is an admin
    try {
        const {email, password} = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({success:true, token})
        } else {
            res.json({success: false, message: "Invalid Credentials"})
        } 

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}





export { loginUser, registerUser, adminLogin };