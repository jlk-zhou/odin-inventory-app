const db = require("../db/recipes/queries");
const ingredientsDb = require("../db/ingredients/queries"); 

// Create methods
const createRecipeGet = (req, res) => {
  res.render("recipes/newRecipe");
};

async function createRecipePost(req, res) {
  await db.createRecipe(req.body.recipeTitle);
  res.redirect("/");
}

// Update methods
async function editRecipeGet(req, res) {
  const recipe = await db.getRecipe(req.params.recipeId);
  const ingredients = await ingredientsDb.getIngredientsByRecipe(req.params.recipeId);
  res.render("recipes/editRecipe", {
    recipe: recipe,
    ingredients: ingredients,
  });
}

async function editRecipePost(req, res) {
  await db.editRecipe(req.params.recipeId, req.body.title);
  res.redirect("/");
}

async function editRecipeStepsGet(req, res) {
  const recipe = await db.getRecipe(req.params.recipeId);
  res.render("recipes/editSteps", { recipe: recipe });
}

async function editRecipeStepsPost(req, res) {
  await db.editRecipeSteps(req.params.recipeId, req.body.steps);
  res.redirect(`/recipes/edit/${req.params.recipeId}`);
}

// Read methods
async function showRecipe(req, res) {
  const recipe = await db.getRecipe(req.params.recipeId);
  const ingredients = await ingredientsDb.getIngredientsByRecipe(req.params.recipeId);
  res.render("recipes/detail", { recipe: recipe, ingredients: ingredients });
}

// Delete a recipe
async function deleteRecipe(req, res) {
  await db.deleteRecipe(req.params.recipeId);
  res.redirect("/");
}

module.exports = {
  createRecipeGet,
  createRecipePost,
  editRecipeGet,
  editRecipePost,
  editRecipeStepsGet,
  editRecipeStepsPost,
  showRecipe,
  deleteRecipe,
};
