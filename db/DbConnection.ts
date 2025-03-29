import mongoose from 'mongoose'

const DbConnect=async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI!)
        console.log('MongoDB Connected successfully 🫡🫡🫡🫡')
    } catch (error) {
      console.log(error)   
    }
}
export default DbConnect;