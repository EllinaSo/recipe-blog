import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
  const { username, password, email } = req.body;

  if (!(username && email && password)) {
    return next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, password: hashedPassword, email });

  try {
    await newUser.save();
    res.status(200).json('Signup successful');
  } catch (error) {
    next(error);
  }
};
