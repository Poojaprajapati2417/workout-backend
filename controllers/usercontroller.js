import { Usermodel } from "./../models/usermodel.js"
import validator from "validator"
import jwt from "jsonwebtoken"




const createtoken = (id) => {
     return jwt.sign({ _id: id }, process.env.SECRET_STRING, { expiresIn: "3d" })
}
//signup controller function

const signup = async (req, res) => {
     try {
          const { email, password } = req.body;
          if ([email, password,].some((field) =>
               field?.trim() === "")) {
               return res.status(200).send(
                    {
                         message: "All fields are required",
                         Status: "notsuccess"

                    }
               )
          }

          if (!validator.isEmail(email)) {
               return res.status(200).send({
                    Status: "notsuccess",
                    message: "Email is not valid"
               })


          }

          if (!validator.isStrongPassword(password)) {
               return res.status(200).send({
                    Status: "notsucess",
                    message: "Enter a strong password (min 8 chars, with numbers, symbols, uppercase & lowercase)"
               })
          }

          const existinguser = await Usermodel.findOne({ email })

          if (existinguser) {
               return res.status(200).send({
                    message: "User already exists",
                    Status: "notsuccess"
               })
          }
          const user = await Usermodel.create({
               email,
               password
          })
          const token = createtoken(user._id)
          res.status(200).send({
               data: user,
               Status: "success",
               message: "signed up successfully",
               token: token
          })
     } catch (error) {
          res.status(500).send({
               error: `server error ${error}`
          })
     }


}

//login controller function 

const login = async (req, res) => {
     try {
          const { email, password } = req.body
          if ([email, password].some((field) =>
               field?.trim() === "")) {
               return res.status(200).send({
                    message: "All fields are compulsory",
                    Status: "notsuccess"
               })

          }
          const user = await Usermodel.findOne({ email })
          if (!user) {
               return res.status(200).send({
                    message: "User not found",
                    Status: "notsuccess"
               })
          }
          const ispasswordvalid = await user.isPasswordCorrect(password)

          if (!ispasswordvalid) {
               return res.status(200).send({
                    message: "invalid email or password ",
                    Status: "notsuccess"
               })
          }

          const token = createtoken(user._id)
          user.token = token
          res.status(200).send({
               message: "User login sucessfully",
               Status: "success",
               user: {
                    email: user.email,
                    token: token
               }
          })
     } catch (error) {
          res.status(500).send({
               message: `Something went wrong to login ${error}`,
               Status: "notsuccess",
               "error": error.message
          })


     }

}

export { signup, login }