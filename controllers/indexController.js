const db = require("../db/recipes/queries");

async function showAllRecipes(req, res) {
  const recipes = await db.getAllRecipes();
  res.render("index", { recipes: recipes });
}

module.exports = {
  showAllRecipes,
};
