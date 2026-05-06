const db = require("../db/tags/queries");
const validators = require("./validators");
const { validationResult, matchedData } = require("express-validator");

// Create methods
const createTagGet = (req, res) => {
  res.render("tags/newTag");
};

const createTagPost = [
  validators.validateTag,
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("tags/newTag", { errors: errors.array() });
    }
    const { tagName } = matchedData(req);
    await db.createTag(tagName);
    res.redirect("/tags");
  },
];

// Update methods
async function editTagGet(req, res) {
  const tag = await db.getTagById(req.params.tagId);
  res.render("tags/editTag", { tag: tag });
}

const editTagPost = [
  validators.validateTag,
  async function (req, res) {
    const tag = await db.getTagById(req.params.tagId); 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("tags/editTag", { tag: tag, errors: errors.array() });
    }
    const { tagName } = matchedData(req);
    await db.editTag(req.params.tagId, tagName);
    res.redirect("/tags");
  },
];

// Read methods
async function showAllTags(req, res) {
  const tags = await db.getAllTags();
  res.render("tags/tags", { tags: tags });
}

async function showTagRecipes(req, res) {
  const tag = await db.getTagById(req.params.tagId);
  res.render("tags/detail", { tag: tag });
}

// Delete method
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
