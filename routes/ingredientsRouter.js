const { Router } = require("express");
const ingredientsRouter = Router();
const ingredientsController = require("../controllers/ingredientsController");

ingredientsRouter.get(
  "/edit/:recipeId",
  ingredientsController.editIngredientGet,
);

ingredientsRouter.post(
  "/add/:recipeId",
  ingredientsController.addIngredientPost,
);

ingredientsRouter.get(
  "/delete/:recipeId/:ingredientId", 
  ingredientsController.deleteIngredient, 
)

module.exports = ingredientsRouter;
