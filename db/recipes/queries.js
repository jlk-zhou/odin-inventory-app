const pool = require("../pool");

// Create queries
async function createRecipe(title) {
  await pool.query("INSERT INTO recipes (title) VALUES ($1); ", [title]);
}

// Read queries
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

// Update queries
async function editRecipe(id, title) {
  await pool.query("UPDATE recipes SET title = ($1) WHERE id = ($2);", [
    title,
    id,
  ]);
}

async function editRecipeSteps(id, steps) {
  await pool.query("UPDATE recipes SET steps = ($1) WHERE id = ($2);", [
    steps,
    id,
  ]);
}

// Delete queries
async function deleteRecipe(id) {
  await pool.query("DELETE FROM recipes WHERE id = ($1);", [id]);
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipe,
  editRecipe,
  editRecipeSteps,
  deleteRecipe,
};
