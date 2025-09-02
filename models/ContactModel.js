import mongoose from "mongoose";

const ContactSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
         email:{
            type:String,
            index:true,
            required:true,
            trim:true
        },
         message:{
            type:String,
            index:true,
            required:true,
            trim:true
        }
    }
)

const ContactModel=mongoose.model("Contact",ContactSchema)

export default ContactModel;