
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import bodyParser from "body-parser";
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
// import dotenv from 'dotenv'

const app = express();

// Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option. 
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// dotenv.config();

app.use('/posts', postRoutes);
app.use('/users', userRoutes);


const CONNECTION_URL = "mongodb+srv://Memories:Memories123@cluster0.wdgg3c3.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;


mongoose.connect(CONNECTION_URL).then(
    () => { app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`)) },
    err => { console.log(err.message) }
  );


