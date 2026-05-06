const db = require("../db/tags/queries");

async function showAllTags(req, res) {
  const tags = await db.getAllTags();
  res.render("tags/tags", { tags: tags });
}

async function showTagRecipes(req, res) {
  const tag = await db.getTagById(req.params.tagId);
  res.render("tags/detail", { tag: tag });
}

const createTagGet = (req, res) => {
  res.render("tags/newTag");
};

async function createTagPost(req, res) {
  await db.createTag(req.body.tagName);
  res.redirect("/tags");
}

async function editTagGet(req, res) {
  const tag = await db.getTagById(req.params.tagId);
  res.render("tags/editTag", { tag: tag });
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

module.exports = {
  showAllTags,
  showTagRecipes,
  createTagGet,
  createTagPost,
  editTagGet,
  editTagPost,
  deleteTag,
};
