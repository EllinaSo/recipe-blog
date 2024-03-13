import Category from '../models/category.model.js';

export const get = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 }).select('-__v');
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
