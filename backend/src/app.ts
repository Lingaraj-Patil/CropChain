import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import cropRoutes from './routes/cropRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import metadataRoutes from './routes/metadataRoutes';
import { errorHandler, notFound } from './middleware/errorHandler';

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors({
    origin: process.env.CLIENT_URL?.split(',') || '*',
    credentials: true,
  }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  app.get('/api/health', (_req, res) => {
    res.json({ success: true, message: 'CropChain API is running' });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/crops', cropRoutes);
  app.use('/api/metadata', metadataRoutes);
  app.use('/api/dashboard', dashboardRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default createApp();
