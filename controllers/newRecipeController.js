const db = require("../db/recipes/queries"); 

const createRecipeGet = (req, res) => {
  res.render("recipes/newRecipe");
};

async function createRecipePost (req, res) {
  await db.createRecipe(req.body.recipeTitle); 
  res.redirect("/");
};

module.exports = { createRecipeGet, createRecipePost };
