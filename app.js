import express from 'express';
import authRoutes from './routes/authRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { corsConfig } from './utils/cors/cors.js';
import dotenv from 'dotenv';
import './models/index.js';
import { errorMiddleWare } from './middlewares/errorMiddleware.js';
dotenv.config({ debug: true });

const app = express();
const PORT = process.env.PORT || 8080;

// CORS
app.use(corsConfig());

// PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/auth', authRoutes);
app.use('/companies', companyRoutes);
app.use('/users', userRoutes);

app.use(errorMiddleWare);

app.listen(PORT, () => {
    console.log('Listening on port 8080');
});
