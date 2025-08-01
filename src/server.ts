  import express from 'express';
  import dotenv from 'dotenv';
  import cors from 'cors'
import rootRouter from './route';
import cookieParser from 'cookie-parser';



  dotenv.config();
  const app = express();
  app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to your frontend URL
    credentials: true, // Allow cookies to be sent with requests
  }));
  app.use(express.json());
  app.use(cookieParser())


  const PORT = 3001;

  app.use('/api',rootRouter)
  app.get('/', (req, res) => {
    res.send('Welcome to WatchHub Backend and MongoDB Connected!');
  });


  (async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
  })();
 


  

