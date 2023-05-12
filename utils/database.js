import mongoose from "mongoose";

let isConnected = false // track the connection

export const conntectToDB = async () => {
  debugger
  mongoose.set('strictQuery', true)
  if (isConnected) {
    console.log('MongoDB is already connected')
    return
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'taxrules',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true
    console.log("MongoDB Connected 😊")
  } catch (error) {
    console.log(error)
  }
}