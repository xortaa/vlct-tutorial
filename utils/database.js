import mongoose from "mongoose"

let isConnected = false

const connectToDatabase = async () => {
  mongoose.set("strictQuery", true)
  if (isConnected) {
    console.log("MongoDB is already connected")
    return
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MongoDB URI is must be set in the environment variables")
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "vlct-tutorial",
    })
    isConnected = true
    console.log("MongoDB is connected")

    require("@/models/customer")

   
  } catch (error) {
    console.log(error)
  }
}

export default connectToDatabase
