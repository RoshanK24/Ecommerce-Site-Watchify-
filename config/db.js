import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/ecoms");
        console.log(`Connected to Mongodb Database ${conn.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log(`Error in Mongodb ${error}`.bgRed.white);
    }
}

export default connectDB;
