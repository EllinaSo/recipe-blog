import express from 'express';
import { signUp, signIn, signWithGoogle } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/google', signWithGoogle);

export default router;
