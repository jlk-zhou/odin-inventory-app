const { Router } = require("express");
const recipesRouter = Router();
const recipesController = require("../controllers/recipesController");

// Create a recipe
recipesRouter.get("/new", recipesController.createRecipeGet);
recipesRouter.post("/new", recipesController.createRecipePost);

// Update tags for a recipe
recipesRouter.get("/edit/tags/:recipeId", recipesController.editRecipeTagsGet);
recipesRouter.post(
  "/edit/tags/:recipeId",
  recipesController.editRecipeTagsPost,
);

// Delete a tag for a recipe
recipesRouter.get(
  "/edit/tags/delete/:recipeId/:tagId",
  recipesController.deleteTagFromRecipe,
);

// Update steps of a recipe
recipesRouter.get(
  "/edit/steps/:recipeId",
  recipesController.editRecipeStepsGet,
);
recipesRouter.post(
  "/edit/steps/:recipeId",
  recipesController.editRecipeStepsPost,
);

// Update title of a recipe
recipesRouter.get("/edit/:recipeId", recipesController.editRecipeGet);
recipesRouter.post("/edit/:recipeId", recipesController.editRecipePost);

// Read a recipe's detail
recipesRouter.get("/:recipeId", recipesController.showRecipe);

// Delete a recipe
recipesRouter.get("/delete/:recipeId", recipesController.deleteRecipe);

module.exports = recipesRouter;
