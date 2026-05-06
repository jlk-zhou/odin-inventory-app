const db = require("../db/ingredients/queries");

// Create methods 
async function addIngredientGet(req, res) {
  const recipe = await db.getRecipe(req.params.recipeId);
  const ingredients = await db.getIngredientsByRecipe(req.params.recipeId);
  res.render("ingredients/addIngredient", {
    recipe: recipe,
    ingredients: ingredients,
  });
}

async function addIngredientPost(req, res) {
  const recipeId = req.params.recipeId;
  const newIngredientId = await db.addNewIngredient(req.body.name);
  const quantity = req.body.quantity;
  const unit = req.body.unit;
  await db.addIngredientToRecipe(recipeId, newIngredientId, quantity, unit);
  res.redirect(`/recipes/ingredients/add/${req.params.recipeId}`);
}

module.exports = { addIngredientGet, addIngredientPost };
