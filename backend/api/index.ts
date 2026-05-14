import dotenv from 'dotenv';
import serverless from 'serverless-http';
import app from '../src/app';

dotenv.config();

export default serverless(app);
