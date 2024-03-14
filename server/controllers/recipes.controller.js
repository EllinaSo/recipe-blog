import Recipe from '../models/recipe.model.js';

export const get = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 6;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const shortVersion = req.query.ver !== 'full';

    const recipes = await Recipe
      .find(
        {
          ...(req.query.userId && { userId: req.query.userId }),
          ...(req.query.category && { category: { $in: req.query.category } }),
          ...(req.query.search && {
            $or: [
              { title: { $regex: req.query.search, $options: 'i' } },
              { description: { $regex: req.query.search, $options: 'i' } },
              { instructions: { $elemMatch: { $regex: req.query.search, $options: 'i' } } }
            ]
          })
        }
      )
      .sort({ createdAt: sortDirection })
      .skip(startIndex * limit)
      .limit(limit)
      .select(shortVersion
        ? {
            _id: 1,
            preview: 1,
            description: 1,
            categories: 1,
            title: 1,
            createdAt: 1,
            updatedAt: 1
          }
        : {});

    const total = await Recipe.countDocuments();

    res.status(200).json({ recipes, total });
  } catch (error) {
    next(error);
  }
};
