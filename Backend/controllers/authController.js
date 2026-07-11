import User from '../models/User.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES})
}

const register=async (req,res)=>{
    const {name,email,password}=req.body
    try{
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                   success:false,
                   message:"User already exist",
            })
        }
        const hashPassword=await bcrypt.hash(password,10)
        
        const user=await User.create({name,email,password:hashPassword})
            res.status(201).json({
            succes: true,
            message:"Admin registered successfully",
            user,
    });
        

    }catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message,
    });
  }
}

const login=async(req,res)=>{
    const {email,password}=(req.body)

   
    try{
       const user=await User.findOne({email})
       if(!user){
        return res.status(400).json({
            succes:false,
            message:"User not found"
        })
       }
       const match=await bcrypt.compare(password,user.password)
       if(!match){
        return res.status(400).json({
            success:false,
            message:"Inavlid password"
        })
       }
       const token=createToken(user._id)
       res.status(200).json({
        succes:true,
        token,
        user,
       })
    }catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message,
    });
  }
}
export {register,login}