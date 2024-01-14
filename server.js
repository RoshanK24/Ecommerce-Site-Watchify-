import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from "path";
import { fileURLToPath } from "url";


//configure env
dotenv.config();

// database config
connectDB();

//esmodule6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// rest Object = to create api
const app = express();

//middelware
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './client/build')));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

//rest api
app.use("*", function(req,res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//PORT
const PORT = process.env.PORT || 8070;

//run listen
app.listen(PORT, () => {
    console.log(`Server runing on ${PORT}`.bgCyan.white);
});