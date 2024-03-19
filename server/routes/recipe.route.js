import express from 'express';
import { create, get, remove } from '../controllers/recipe.controller.js';
import verifyToken from '../middlewares/user.middleware.js';

const router = express.Router();

router.get('/:id', get);
router.post('/create', verifyToken, create);
router.delete('/delete/:id', verifyToken, remove);

export default router;
