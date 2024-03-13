import express from 'express';
import { get } from '../controllers/recipes.controller.js';

const router = express.Router();

router.get('', get);

export default router;
