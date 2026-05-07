const pool = require("../pool");

// Create queries
async function createRecipe(title) {
  await pool.query("INSERT INTO recipes (title) VALUES ($1); ", [title]);
}

async function addTagToRecipe(recipeId, tagId) {
  await pool.query(
    `
    INSERT INTO recipes_tags (recipe_id, tag_id)
    VALUES (($1), ($2)); 
    `,
    [recipeId, tagId],
  );
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

async function getTagForRecipe(recipeId) {
  const { rows } = await pool.query(
    `
    SELECT tags.id, tags.name
    FROM tags
    JOIN recipes_tags ON tags.id = tag_id
    WHERE recipe_id = ($1); 
    `,
    [recipeId],
  );
  return rows;
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
async function deleteTagFromRecipe(recipeId, tagId) {
  await pool.query(
    "DELETE FROM recipes_tags WHERE recipe_id = ($1) AND tag_id = ($2); ",
    [recipeId, tagId],
  );
}

async function deleteRecipe(id) {
  const { rows } = await pool.query(
    "DELETE FROM recipes_ingredients WHERE recipe_id = ($1) RETURNING ingredient_id; ",
    [id],
  );
  await pool.query("DELETE FROM recipes_tags WHERE recipe_id = ($1);", [id]);
  await pool.query("DELETE FROM recipes WHERE id = ($1);", [id]);
}

module.exports = {
  createRecipe,
  addTagToRecipe,
  getAllRecipes,
  getRecipe,
  getTagForRecipe,
  editRecipe,
  editRecipeSteps,
  deleteTagFromRecipe,
  deleteRecipe,
};
