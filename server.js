import express from "express"
import dotenv from "dotenv"
dotenv.config()
import workoutroutes from "./routes/workoutroutes.js"
import userroutes from "./routes/userroutes.js"
import connectdb from "./db/db.js"
import cors from "cors"


// express app
const app = express();


//middleware

app.use((req,res,next)=>{
console.log(req.path,req.method)
next()
})
   //server cannot read input json data without this , mostly used in patch put post reqs
app.use(express.json())

app.use(cors({
    origin: 'http://localhost4000',
    
}))


// // routes

// app.get('/',(req,res)=>{
// res.json({mssg: "welcome to the app"})


// })
//workout route
app.use("/workouts",workoutroutes)
//user route

app.use("/user",userroutes)


//listening in port

connectdb()
.then((result) => {
    app.listen(process.env.PORT ,()=>{
        console.log(`MONGO DB connected &listening on the port ${process.env.PORT}!!`)
    })
    
})
.catch((err) => {
    console.log(`MONGO db connection error,${err}!!);
    }`)
});
// app.listen(process.env.PORT ,()=>{
//     console.log(`listening on the port ${process.env.PORT}!!!!!!`)
// })