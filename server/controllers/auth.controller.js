import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import { validatePasswordLength, validateUsernameLength, validateUsernameSpace, validateUsernameCase, validateUsernameSymbols } from '../utils/user.js';

export const signUp = async (req, res, next) => {
  const { username, password, email } = req.body;

  if (!(username && email && password)) {
    return next(errorHandler(400, 'All fields are required'));
  }

  const passwordError = validatePasswordLength(password);
  if (passwordError) {
    return next(errorHandler(400, passwordError));
  }

  const usernameError =
    validateUsernameLength(username) ||
    validateUsernameSpace(username) ||
    validateUsernameCase(username) ||
    validateUsernameSymbols(username);
  if (usernameError) {
    return next(errorHandler(400, usernameError));
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

const signInError = 'Incorrect username or password';
export const signIn = async (req, res, next) => {
  const { password, email } = req.body;

  if (!(email && password)) {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const user = await User.findOne({ email });

    if (!(user)) {
      return next(errorHandler(404, signInError));
    }

    if (!(bcryptjs.compareSync(password, user.password))) {
      return next(errorHandler(404, signInError));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password: hashedPassword, ...userData } = user._doc;
    res.status(200)
      .cookie('access_token', token, { httpOnly: true })
      .json(userData);
  } catch (error) {
    next(error);
  }
};

export const signWithGoogle = async (req, res, next) => {
  const { name, googlePhotoUrl, email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...userData } = user._doc;
      res.status(200)
        .cookie('access_token', token, { httpOnly: true })
        .json(userData);
    }

    const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

    let username = name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4);
    username = username.length < 8 ? username.padEnd(8, '0') : username;
    username = username.length > 20 ? username.substring(0, 20) : username;

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePicture: googlePhotoUrl
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { password, ...userData } = newUser._doc;
    res.status(200)
      .cookie('access_token', token, { httpOnly: true })
      .json(userData);
  } catch (error) {
    next(error);
  }
};
