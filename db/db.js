import mongoose from "mongoose";




const connectdb =async () => {
  try {
    const connectioninstance=await mongoose.connect(process.env.MONGO_URI)

    console.log(   `mongodb connected!! db host ${connectioninstance.connection.host}`)
  } catch (error) {
    console.log(`mongo db connection failed${error}`)
    process.exit(1)
  }
}
export default connectdb