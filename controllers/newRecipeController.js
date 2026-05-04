const createRecipeGet = (req, res) => {
  res.render("newRecipe");
};

const createRecipePost = (req, res) => {
  res.redirect("/");
};

module.exports = { createRecipeGet, createRecipePost };
