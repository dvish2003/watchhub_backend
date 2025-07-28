  import express from 'express';
  import dotenv from 'dotenv';
  import mongoose from 'mongoose';
  import cors from 'cors'
  import { connectDB } from './config/db';
import rootRouter from './route';



  dotenv.config();
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  const PORT = 3000;

  app.use('/api',rootRouter)
  app.get('/', (req, res) => {
    res.send('Welcome to WatchHub Backend and MongoDB Connected!');
  });


  (async () => {
 connectDB().then(() => {
    console.log("Database connected successfully");

  }).catch((error) => {
    console.error("Database connection failed:", error);
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
  })();
 


  

