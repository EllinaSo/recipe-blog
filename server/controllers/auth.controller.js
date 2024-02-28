import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

const signinError = 'Incorrect username or password';
export const signin = async (req, res, next) => {
  const { password, email } = req.body;

  if (!(email && password)) {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const user = await User.findOne({ email });

    if (!(user)) {
      return next(errorHandler(404, signinError));
    }

    const { password: hashedPassword, ...userData } = user._doc;
    if (!(bcryptjs.compareSync(password, hashedPassword))) {
      return next(errorHandler(404, signinError));
    }

    const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET);
    res.status(200)
      .cookie('access_token', token, { httpOnly: true })
      .json(userData);
  } catch (error) {
    next(error);
  }
};
