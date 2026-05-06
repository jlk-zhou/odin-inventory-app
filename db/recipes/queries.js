const pool = require("../pool");

async function getAllRecipes() {
  const { rows } = await pool.query("SELECT * FROM recipes; ");
  return rows;
}

async function getRecipe(id) {
  const { rows } = await pool.query("SELECT * FROM recipes WHERE id = ($1);", [
    id,
  ]);
  return rows[0];
}

async function createRecipe(title) {
  await pool.query("INSERT INTO recipes (title) VALUES ($1); ", [title]);
}

async function editRecipe(id, title) {
  await pool.query("UPDATE recipes SET title = ($1) WHERE id = ($2);", [
    title,
    id,
  ]);
}

async function getIngredientsByRecipe(recipeId) {
  const { rows } = await pool.query(`
    SELECT ingredients.id, name, quantity, unit
    FROM recipes_ingredients
    JOIN ingredients
    ON ingredient_id = ingredients.id
    WHERE recipe_id = ($1); 
    `, [recipeId]);
  return rows;
}

async function addNewIngredient(name) {
  const { rows } = await pool.query(
    "INSERT INTO ingredients (name) VALUES ($1) RETURNING id; ",
    [name],
  );
  return rows[0].id;
}

async function addIngredientToRecipe(recipeId, ingredientId, quantity, unit) {
  await pool.query(
    `
    INSERT INTO recipes_ingredients (recipe_id, ingredient_id, quantity, unit)
      VALUES (($1), ($2), ($3), ($4)); 
    `,
    [recipeId, ingredientId, quantity, unit],
  );
}

async function editRecipeSteps(id, steps) {
  await pool.query("UPDATE recipes SET steps = ($1) WHERE id = ($2);", [
    steps,
    id,
  ]);
}

async function deleteRecipe(id) {
  await pool.query("DELETE FROM recipes WHERE id = ($1);", [id]);
}

module.exports = {
  getAllRecipes,
  getRecipe,
  createRecipe,
  editRecipe,
  getIngredientsByRecipe, 
  addNewIngredient,
  addIngredientToRecipe,
  editRecipeSteps,
  deleteRecipe,
};
