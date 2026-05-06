const pool = require("../pool");

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

async function createTag(name) {
  await pool.query("INSERT INTO tags (name) VALUES ($1); ", [name]);
}

async function editTag(id, name) {
  await pool.query("UPDATE tags SET name = ($1) WHERE id = ($2); ", [name, id]);
}

async function deleteTag(id) {
  await pool.query("DELETE FROM tags WHERE id = ($1); ", [id]);
}

module.exports = {
  getAllTags,
  getTagById,
  createTag,
  editTag,
  deleteTag,
};
