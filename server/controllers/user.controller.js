import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import { validatePasswordLength, validateUsernameLength, validateUsernameSpace, validateUsernameCase, validateUsernameSymbols } from '../utils/user.js';
import User from '../models/user.model.js';

export const test = (req, res) => {
  res.json({ message: 'API is working' });
};

export const updateUser = async (req, res, next) => {
  const { body, params } = req;
  if (req.user.id !== params.userId) {
    return next(errorHandler(403, 'You do not have permission to perform this action'));
  }

  if (body.password) {
    const passwordError = validatePasswordLength(body.password);
    if (passwordError) {
      return next(errorHandler(400, passwordError));
    }
    body.password = bcryptjs.hashSync(body.password, 10);
  }

  if (body.username) {
    const usernameError =
      validateUsernameLength(body.username) ||
      validateUsernameSpace(body.username) ||
      validateUsernameCase(body.username) ||
      validateUsernameSymbols(body.username);
    if (usernameError) {
      return next(errorHandler(400, usernameError));
    }
  }

  try {
    const currentUser = await User.findById(params.userId);
    const isGoogleUser = currentUser.isGoogleUser || false;

    const updatedUser = await User.findByIdAndUpdate(params.userId, {
      $set: {
        username: body.username,
        email: isGoogleUser ? currentUser.email : body.email,
        profilePicture: body.profilePicture,
        password: isGoogleUser ? currentUser.password : body.password
      }
    }, { new: true });
    const { password, ...userData } = updatedUser._doc;
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { params } = req;
  if (req.user.id !== params.userId) {
    return next(errorHandler(403, 'You do not have permission to perform this action'));
  }

  try {
    await User.findByIdAndDelete(params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
};
