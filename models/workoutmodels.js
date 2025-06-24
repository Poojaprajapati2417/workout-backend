import mongoose from "mongoose";

const workoutSchema=new mongoose.Schema({
    Title:{
        type:String,
        required:true,
        
    },
    Reps:{
        type:Number,
        required:true,
    },
    user_id:{
        type:String,
        required:true
    },
    Load:{
        type:Number,
        required:true,
    }
},
{timestamps:true})

export const workoutmodel=mongoose.model("Workout",workoutSchema)