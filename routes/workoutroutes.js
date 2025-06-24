import express from "express"
import { createworkout,getworkouts,getworkout, deleteworkout,updateworkout } from "../controllers/workoutcontrollers.js"
import requireAuth from "../MIddlewares/RequireAuth.js"


const router=express.Router()

// require Auths for all workout routes
router.use(requireAuth)
// this is to get all workouts
router.get(("/"),getworkouts)

//This is to get single workout

router.get(("/:id"),getworkout)

//post a new workout

router.post(("/"),createworkout)

//delete a workout

router.delete(("/:id"),deleteworkout)

//update a workout  

router.patch(("/:id"),updateworkout)
export default router;