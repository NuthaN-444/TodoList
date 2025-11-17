const mongoose = require('mongoose');


const connectDB = async () => {
    console.log("URL from env:", process.env.MONGODB_URL);
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/TodoListApp`)
        // console.log(`\n MongoDB connected !! DB HOST ${connectionInstance.connection.host}`);
        console.log("Connected")
    } catch (error) {
        console.log("Mongoose connection error ",error);
    }
}

module.exports = connectDB;