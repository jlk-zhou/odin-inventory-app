const db = require("../db/ingredients/queries");
const recipesDb = require("../db/recipes/queries");
const validators = require("./validators");
const { validationResult, matchedData } = require("express-validator");

// Create methods
async function editIngredientGet(req, res) {
  const recipe = await recipesDb.getRecipe(req.params.recipeId);
  const ingredients = await db.getIngredientsByRecipe(req.params.recipeId);
  res.render("ingredients/editIngredients", {
    recipe: recipe,
    ingredients: ingredients,
  });
}

const addIngredientPost = [
  validators.validateIngredient,
  async function (req, res) {
    const recipe = await recipesDb.getRecipe(req.params.recipeId);
    const recipeId = req.params.recipeId;
    const ingredients = await db.getIngredientsByRecipe(req.params.recipeId);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("ingredients/editIngredients", {
          recipe: recipe,
          ingredients: ingredients,
          errors: errors.array(),
        });
    }

    const { name, quantity, unit } = matchedData(req); 
    const newIngredientId = await db.addNewIngredient(name);
    await db.addIngredientToRecipe(recipeId, newIngredientId, quantity, unit);
    res.redirect(`/recipes/ingredients/edit/${recipeId}`);
  },
];

// Delete methods
async function deleteIngredient(req, res) {
  const recipeId = req.params.recipeId;
  const ingredientId = req.params.ingredientId;
  await db.deleteIngredient(recipeId, ingredientId);
  res.redirect(`/recipes/ingredients/edit/${req.params.recipeId}`);
}

module.exports = { editIngredientGet, addIngredientPost, deleteIngredient };
