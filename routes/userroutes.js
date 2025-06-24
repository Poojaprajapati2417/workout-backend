import express from "express"
const router=express.Router()
import { signup,login } from "../controllers/usercontroller.js"

//login route
router.post("/login",login)


//register/signup route

router.post("/signup",signup)


export default router