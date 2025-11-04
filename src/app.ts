import express, { type Express } from 'express';
import authRoutes from './routes/auth.routes.js';


const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', authRoutes);

export default app;