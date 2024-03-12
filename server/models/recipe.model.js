import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true
  },
  preview: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  categories: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Category'
  },
  prepTime: {
    type: String,
    require: true
  },
  cookTime: {
    type: String,
    require: true
  },
  totalTime: {
    type: String,
    require: true
  },
  ingredients: {
    type: [String],
    require: true
  },
  instructions: {
    type: [String],
    require: true
  },
  note: {
    type: String
  }
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
