const { Router } = require("express");
const ingredientsRouter = Router();
const ingredientsController = require("../controllers/ingredientsController");

ingredientsRouter.get(
  "/add/:recipeId",
  ingredientsController.addIngredientGet,
);

ingredientsRouter.post(
  "/add/:recipeId",
  ingredientsController.addIngredientPost,
);

module.exports = ingredientsRouter;
