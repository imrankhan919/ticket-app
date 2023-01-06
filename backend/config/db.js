const { mongoose } = require("mongoose")

const connectDB = async() => {
 
    const conn =  await mongoose.connect(process.env.MONGO_URI)
    console.log(`Database Conected : ${conn.connection.port}`.bgGreen.underline)
    
}

module.exports = connectDB