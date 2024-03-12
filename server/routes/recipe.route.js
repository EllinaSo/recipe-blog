import express from 'express';
import { create } from '../controllers/recipe.controller.js';
import verifyToken from '../middlewares/user.middleware.js';

const router = express.Router();

router.post('/create', verifyToken, create);

export default router;
