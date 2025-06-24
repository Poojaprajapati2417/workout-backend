import { Usermodel } from "../models/usermodel.js"
import jwt from "jsonwebtoken"
const requireAuth = async (req, res, next) => {


    // verify authentication
    const { authorization } = req.headers;
    console.log("AUTH HEADER:", authorization); 

    if (!authorization) {
        return res.status(401).send({
            error: "Authentication token required"
        })
    }

    const token = authorization.split(" ")[1]


    try {
        const { _id } = jwt.verify(token, process.env.SECRET_STRING)
        req.user = await Usermodel.findOne({ _id }).select("_id")
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({
            error: "Request is not authorized"
        })
    }
}

export default requireAuth