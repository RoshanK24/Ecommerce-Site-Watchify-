import mongoose from 'mongoose'; 
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log(`Connected to Mongodb Database ${conn.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log(`Error in Mongodb ${error}`.bgRed.white);
    }
}

export default connectDB;
