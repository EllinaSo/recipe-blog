import Recipe from '../models/recipe.model.js';
import Category from '../models/category.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a recipe'));
  }

  const { ingredients, instructions, categories = [], newCategories = [], note, ...simpleFields } = req.body;
  if (Object.values(simpleFields).every(field => !field) ||
  !(ingredients.length && (categories.length || newCategories.length) && instructions.length)) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }

  let newCategoriesId = [];
  if (newCategories.length) {
    try {
      const savedCategories = await Category.insertMany(newCategories.map(category => ({ name: category })));
      newCategoriesId = savedCategories.map(({ _id: id }) => id);
    } catch (error) {
      return next(errorHandler(400, 'Error occurred while creating the category.'));
    }
  }

  const newRecipe = new Recipe({
    ...simpleFields,
    ingredients,
    instructions,
    note,
    userId: req.user.id,
    categories: [...categories, ...newCategoriesId]
  });

  try {
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    next(error);
  }
};
