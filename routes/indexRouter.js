const { Router } = require("express"); 
const indexRouter = Router(); 
const indexController = require("../controllers/indexController"); 

indexRouter.get("/recipe/:recipeId", indexController.showRecipe); 

indexRouter.get("/recipe/add-ingredient/:recipeId", indexController.addIngredientGet); 
indexRouter.post("/recipe/add-ingredient/:recipeId", indexController.addIngredientPost); 

indexRouter.get("/recipe/edit/steps/:recipeId", indexController.editRecipeStepsGet); 
indexRouter.post("/recipe/edit/steps/:recipeId", indexController.editRecipeStepsPost); 

indexRouter.get("/recipe/edit/:recipeId", indexController.editRecipeGet); 
indexRouter.post("/recipe/edit/:recipeId", indexController.editRecipePost); 

indexRouter.get("/recipe/delete/:recipeId", indexController.deleteRecipe); 
indexRouter.get("/", indexController.showAllRecipes);
module.exports = indexRouter; 