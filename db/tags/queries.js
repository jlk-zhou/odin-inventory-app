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

// Update queries
async function editTag(id, name) {
  await pool.query("UPDATE tags SET name = ($1) WHERE id = ($2); ", [name, id]);
}

// Delete queries
async function deleteTag(id) {
  await pool.query("DELETE FROM tags WHERE id = ($1); ", [id]);
}

module.exports = {
  createTag,
  getAllTags,
  getTagById,
  editTag,
  deleteTag,
};
