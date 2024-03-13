import express from 'express';
import { get } from '../controllers/category.controller.js';

const router = express.Router();

router.get('/', get);

export default router;
