import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import errorHandlerMiddleware from './middlewares/error.middleware.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log('MongoDb is connected');
    app.listen(PORT, '0.0.0.0', () => console.log(`Server is running on port ${PORT}`));
  })
  .catch(error => console.log(error));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandlerMiddleware);
