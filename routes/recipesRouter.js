const { Router } = require("express");
const recipesRouter = Router(); 
const recipesController = require("../controllers/recipesController"); 

// Create a recipe 
recipesRouter.get("/new", recipesController.createRecipeGet); 
recipesRouter.post("/new", recipesController.createRecipePost); 

// Update title of a recipe
recipesRouter.get("/edit/:recipeId", recipesController.editRecipeGet); 
recipesRouter.post("/edit/:recipeId", recipesController.editRecipePost); 

// Update steps of a recipe
recipesRouter.get("/edit/steps/:recipeId", recipesController.editRecipeStepsGet); 
recipesRouter.post("/edit/steps/:recipeId", recipesController.editRecipeStepsPost); 

// Read a recipe's detail
recipesRouter.get("/:recipeId", recipesController.showRecipe); 

// Delete a recipe
recipesRouter.get("/delete/:recipeId", recipesController.deleteRecipe); 

module.exports = recipesRouter; 