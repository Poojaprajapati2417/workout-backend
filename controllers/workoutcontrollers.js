import mongoose from "mongoose";
import { workoutmodel } from "../models/workoutmodels.js";




//create new workout(post)

const createworkout = async (req, res) => {

    

    try {
        const { Title, Load, Reps } = req.body
        let emptyFields = []
    
        if (!Title) {
            emptyFields.push("Title")
        }
        if (!Load) {
            emptyFields.push("Load")
        }
        if (!Reps) {
            emptyFields.push("Reps")
        }
        if (emptyFields.length > 0) {
            return res.status(400).send({ message: "Please fill in all the fields", 
                emptyFields,
                status:"notsuccess" })
        }

        const user_id=req.user._id
        const workout = await workoutmodel.create({ Title, Load, Reps,user_id })
        res.status(200).send({
            message: "Workout added  successfully",
            status: "success",
            workout
        })
    } catch (error) {
        res.status(400).send({
            message: "error caused while craeting workout", error,
            status: "not success",
        })
    }
}

//update workout(patch)
const updateworkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return (
            res.status(404).json({ error: "NO WORKOUT FOUND WITH THIS ID" })
        )
    }
    try {
        const workout = await workoutmodel.findByIdAndUpdate({ _id: id },
            { ...req.body },
            { new: true })
        if (!workout) {
            res.status(404).json({ error: "NO SUCH WORKOUT" })
        }
        res.status(200).json({
            message: "workout updated successfully",
            workout: workout
        })

    }
    catch (error) {
        res.status(500).json({ error: "server error" })
    }
}




//delete workout(delete)

const deleteworkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return (
            res.status(404).json({ error: "NO WORKOUT FOUND WITH THIS ID" })
        )
    }
    try {
        const workout = await workoutmodel.findByIdAndDelete({ _id: id })
        if (!workout) {
            res.status(404).json({ error: "NO SUCH WORKOUT" })
        }
        res.status(200).json({"workout deleted successfully": workout})

    }
    catch (error) {
        res.status(500).json({ error: "server error" })
    }
}

//get workouts(get)
const getworkouts = async (req, res) => {
    const user_id=req.user._id
    const workouts = await workoutmodel.find({user_id}).sort({ createdAt: -1 })
    res.status(200).json(workouts)
}

//get single workout by id

const getworkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return (
            res.status(404).json({ error: "NO WORKOUT FOUND WITH THIS ID" })
        )
    }
    const singleworkout = await workoutmodel.findById(id)
    if (!singleworkout) {
        return res.status(404).json({ error: "NO SUCH WORKOUT" })
    }
    res.status(200).json(singleworkout)
}

export { createworkout, getworkouts, getworkout, deleteworkout, updateworkout }