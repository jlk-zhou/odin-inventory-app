const db = require("../db/recipes/queries");

async function showAllRecipes(req, res) {
  const recipes = await db.getAllRecipes();
  res.render("index", { recipes: recipes });
}

async function showRecipe(req, res) {
  const recipe = await db.getRecipe(req.params.recipeId);
  const ingredients = await db.getIngredientsByRecipe(req.params.recipeId); 
  res.render("recipes/detail", { recipe: recipe, ingredients: ingredients });
}

async function addIngredientGet(req, res) {
  const recipe = await db.getRecipe(req.params.recipeId);
  const ingredients = await db.getIngredientsByRecipe(req.params.recipeId); 
  res.render("recipes/addIngredient", { recipe: recipe, ingredients: ingredients });
}

async function addIngredientPost(req, res) {
  const recipeId = req.params.recipeId;
  const newIngredientId = await db.addNewIngredient(req.body.name); 
  const quantity = req.body.quantity; 
  const unit = req.body.unit; 
  await db.addIngredientToRecipe(recipeId, newIngredientId, quantity, unit); 
  res.redirect(`/recipe/add-ingredient/${req.params.recipeId}`); 
}

async function editRecipeStepsGet(req, res) {
  const recipe = await db.getRecipe(req.params.recipeId);
  res.render("recipes/editSteps", { recipe: recipe });
}

async function editRecipeStepsPost(req, res) {
  await db.editRecipeSteps(req.params.recipeId, req.body.steps);
  res.redirect(`/recipe/edit/${req.params.recipeId}`);
}

async function editRecipeGet(req, res) {
  const recipe = await db.getRecipe(req.params.recipeId);
  const ingredients = await db.getIngredientsByRecipe(req.params.recipeId); 
  res.render("recipes/editRecipe", { recipe: recipe, ingredients: ingredients });
}

async function editRecipePost(req, res) {
  await db.editRecipe(req.params.recipeId, req.body.title);
  res.redirect("/");
}

async function deleteRecipe(req, res) {
  await db.deleteRecipe(req.params.recipeId);
  res.redirect("/");
}

module.exports = {
  showAllRecipes,
  showRecipe,
  addIngredientGet,
  addIngredientPost, 
  editRecipeStepsGet,
  editRecipeStepsPost,
  editRecipeGet,
  editRecipePost,
  deleteRecipe,
};
