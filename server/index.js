import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import recipeRoutes from './routes/recipe.route.js';
import recipesRoutes from './routes/recipes.route.js';
import categoryRoutes from './routes/category.route.js';
import errorHandlerMiddleware from './middlewares/error.middleware.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log('MongoDb is connected');
    app.listen(PORT, '0.0.0.0', () => console.log(`Server is running on port ${PORT}`));
  })
  .catch(error => console.log(error));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/recipes', recipesRoutes);
app.use('/api/categories', categoryRoutes);

app.use(errorHandlerMiddleware);
