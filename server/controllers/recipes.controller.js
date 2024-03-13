import Recipe from '../models/recipe.model.js';

export const get = async (req, res, next) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: 1 }).select({
      _id: 1,
      preview: 1,
      description: 1,
      categories: 1,
      title: 1
    });
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};
