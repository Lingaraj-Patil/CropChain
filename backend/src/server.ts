import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/db';

dotenv.config();

const port = process.env.PORT || 5000;

const start = async (): Promise<void> => {
  await connectDB();
  app.listen(port, () => {
    console.log(`CropChain backend running on port ${port}`);
  });
};

void start();
