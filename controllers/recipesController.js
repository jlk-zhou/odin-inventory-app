const db = require("../db/recipes/queries");
const ingredientsDb = require("../db/ingredients/queries");
const tagsDb = require("../db/tags/queries");
const { validationResult, matchedData } = require("express-validator");
const validators = require("./validators");

// Create methods
const createRecipeGet = (req, res) => {
  res.render("recipes/newRecipe");
};

const createRecipePost = [
  validators.validateRecipe,
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("recipes/newRecipe", { errors: errors.array() });
    }
    const title = matchedData(req);
    await db.createRecipe(title);
    res.redirect("/");
  },
];

// Update methods
async function editRecipeGet(req, res) {
  const recipe = await db.getRecipe(req.params.recipeId);
  const ingredients = await ingredientsDb.getIngredientsByRecipe(
    req.params.recipeId,
  );
  res.render("recipes/editRecipe", {
    recipe: recipe,
    ingredients: ingredients,
  });
}

const editRecipePost = [
  validators.validateRecipe,
  async function (req, res) {
    const recipe = await db.getRecipe(req.params.recipeId);
    const ingredients = await ingredientsDb.getIngredientsByRecipe(
      req.params.recipeId,
    );
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("recipes/editRecipe", {
        recipe: recipe,
        ingredients: ingredients,
        errors: errors.array(),
      });
    }
    const { title } = matchedData(req);
    await db.editRecipe(req.params.recipeId, title);
    res.redirect("/");
  },
];

async function editRecipeStepsGet(req, res) {
  const recipe = await db.getRecipe(req.params.recipeId);
  res.render("recipes/editSteps", { recipe: recipe });
}

const editRecipeStepsPost = [
  validators.validateRecipeSteps,
  async function (req, res) {
    const recipe = await db.getRecipe(req.params.recipeId);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("recipes/editSteps", {
        recipe: recipe,
        errors: errors.array(),
      });
    }
    const { steps } = matchedData(req);
    await db.editRecipeSteps(req.params.recipeId, steps);
    res.redirect(`/recipes/edit/${req.params.recipeId}`);
  },
];

async function editRecipeTagsGet(req, res) {
  const recipe = await db.getRecipe(req.params.recipeId);
  const availableTags = await tagsDb.getAvailableTags(req.params.recipeId);
  const tags = await db.getTagForRecipe(req.params.recipeId); 
  res.render("recipes/editTags", {
    recipe: recipe,
    availableTags: availableTags,
    tags: tags
  });
}

const editRecipeTagsPost = [
  validators.validateRecipeTags,
  async function (req, res) {
    const recipe = await db.getRecipe(req.params.recipeId);
    const availableTags = await tagsDb.getAvailableTags(req.params.recipeId);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("recipes/editTags", {
        recipe: recipe,
        availableTags: availableTags,
        errors: errors.array(),
      });
    }
    const { tagId } = matchedData(req); 
    await db.addTagToRecipe(req.params.recipeId, tagId); 
    res.redirect(`/recipes/edit/tags/${req.params.recipeId}`); 
  },
];

// Read methods
async function showRecipe(req, res) {
  const recipe = await db.getRecipe(req.params.recipeId);
  const ingredients = await ingredientsDb.getIngredientsByRecipe(
    req.params.recipeId,
  );
  res.render("recipes/detail", { recipe: recipe, ingredients: ingredients });
}

// Delete a tag from recipe
async function deleteTagFromRecipe(req, res) {
  await db.deleteTagFromRecipe(req.params.recipeId, req.params.tagId); 
  res.redirect(`/recipes/edit/tags/${req.params.recipeId}`); 
}

// Delete a recipe
async function deleteRecipe(req, res) {
  await db.deleteRecipe(req.params.recipeId);
  res.redirect("/");
}

module.exports = {
  createRecipeGet,
  createRecipePost,
  editRecipeGet,
  editRecipePost,
  editRecipeStepsGet,
  editRecipeStepsPost,
  editRecipeTagsGet,
  editRecipeTagsPost, 
  showRecipe,
  deleteTagFromRecipe, 
  deleteRecipe,
};
