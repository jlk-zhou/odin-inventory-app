const pool = require("../pool");

// Create queries
async function createTag(name) {
  await pool.query("INSERT INTO tags (name) VALUES ($1); ", [name]);
}

// Read queries
async function getAllTags() {
  const { rows } = await pool.query("SELECT * FROM tags; ");
  return rows;
}

async function getTagById(id) {
  const { rows } = await pool.query("SELECT * FROM tags WHERE id = ($1); ", [
    id,
  ]);
  return rows[0];
}

async function getRecipesByTag(tagId) {
  const { rows } = await pool.query(`
    SELECT recipes.id, recipes.title FROM recipes
    JOIN recipes_tags ON recipes.id = recipe_id
    WHERE tag_id = ($1); 
    `, [tagId]); 
  return rows; 
}

// Read all tags that are yet to be added to a recipe
async function getAvailableTags(recipeId) {
  const { rows } = await pool.query(
    `
    SELECT tags.id, tags.name FROM tags
    LEFT JOIN recipes_tags ON tags.id = tag_id
    WHERE recipe_id IS DISTINCT FROM ($1); 
    `,
    [recipeId],
  );
  return rows;
}

// Update queries
async function editTag(id, name) {
  await pool.query("UPDATE tags SET name = ($1) WHERE id = ($2); ", [name, id]);
}

// Delete queries
async function deleteTag(id) {
  await pool.query("DELETE FROM recipes_tags WHERE tag_id = ($1); ", [id]); 
  await pool.query("DELETE FROM tags WHERE id = ($1); ", [id]);
}

module.exports = {
  createTag,
  getAllTags,
  getTagById,
  getRecipesByTag, 
  getAvailableTags, 
  editTag,
  deleteTag,
};
