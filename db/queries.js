const pool = require("./pool");

async function createRecipe(recipe) {
  await pool.query(
    "INSERT INTO recipes (tag_id, title, steps) VALUES (($1), ($2), ($3)); ",
    [recipe.tag_id, recipe.title, recipe.steps],
  );
}

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

async function createTag(tag) {
  await pool.query("INSERT INTO tags (recipe_id, name) VALUES (($1), ($2)); ", [
    tag.recipe_id,
    tag.name,
  ]);
}

async function editTag(id, name) {
  await pool.query("UPDATE tags SET name = ($1) WHERE id = ($2); ", [name, id]);
}

async function deleteTag(tagId) {
  await pool.query("DELETE FROM tags WHERE id = ($1); ", [tagId]);
}

module.exports = { createRecipe, getAllTags, getTagById, createTag, editTag, deleteTag };
