import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const signup = async (req, res) => {
  const { username, password, email } = req.body;

  if (!(username && email && password)) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, password: hashedPassword, email });

  try {
    await newUser.save();
    return res.status(200).json('Signup successful');
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
};
