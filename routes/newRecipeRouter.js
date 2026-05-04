const { Router } = require("express");
const newRecipeRouter = Router(); 
const newRecipeController = require("../controllers/newRecipeController"); 

newRecipeRouter.get("/", newRecipeController.createRecipeGet); 
newRecipeRouter.post("/", newRecipeController.createRecipePost); 

module.exports = newRecipeRouter; 