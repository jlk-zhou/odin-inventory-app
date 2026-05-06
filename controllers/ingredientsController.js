const db = require("../db/ingredients/queries");
const recipesDb = require("../db/recipes/queries"); 

// Create methods 
async function editIngredientGet(req, res) {
  const recipe = await recipesDb.getRecipe(req.params.recipeId);
  const ingredients = await db.getIngredientsByRecipe(req.params.recipeId);
  res.render("ingredients/editIngredients", {
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
  res.redirect(`/recipes/ingredients/edit/${req.params.recipeId}`);
}

// Delete methods
async function deleteIngredient(req, res) {
  const recipeId = req.params.recipeId; 
  const ingredientId = req.params.ingredientId; 
  await db.deleteIngredient(recipeId, ingredientId); 
  res.redirect(`/recipes/ingredients/edit/${req.params.recipeId}`); 
}

module.exports = { editIngredientGet, addIngredientPost, deleteIngredient };
