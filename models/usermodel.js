import mongoose from "mongoose";
import bcrypt from "bcrypt"

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        trim:true,
        index:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
    
},
{timestamps:true})


UserSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    try {
         this.password=await bcrypt.hash(this.password,10);
    next()
    } catch (error) {
       return next(error)
    }
   
})

UserSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}


export const Usermodel=mongoose.model("User",UserSchema)