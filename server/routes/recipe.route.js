import express from 'express';
import { create, get } from '../controllers/recipe.controller.js';
import verifyToken from '../middlewares/user.middleware.js';

const router = express.Router();

router.get('/:id', get);
router.post('/create', verifyToken, create);

export default router;
