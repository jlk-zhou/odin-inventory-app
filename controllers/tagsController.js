const db = require("../db/queries");

async function showAllTags(req, res) {
  const tags = await db.getAllTags();
  res.render("tags", { tags: tags });
}

const createTagGet = (req, res) => {
  res.render("newTag");
};

async function createTagPost(req, res) {
  await db.createTag(req.body.tagName);
  res.redirect("/tags");
}

async function editTagGet(req, res) {
  const tag = await db.getTagById(req.params.tagId);
  res.render("editTag", { tag: tag });
}

async function editTagPost(req, res) {
  const tagId = req.params.tagId; 
  const newTagName = req.body.tagName; 
  await db.editTag(tagId, newTagName); 
  res.redirect("/tags"); 
}

async function deleteTag(req, res) {
  await db.deleteTag(req.params.tagId);
  res.redirect("/tags");
}

module.exports = { showAllTags, createTagGet, createTagPost, editTagGet, editTagPost, deleteTag };
