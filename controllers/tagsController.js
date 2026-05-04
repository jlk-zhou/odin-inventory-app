const showAllTags = (req, res) => {
  res.render("tags");
};

const createTagGet = (req, res) => {
  res.render("newTag");
};

const createTagPost = (req, res) => {
  res.redirect("/");
};

module.exports = { showAllTags, createTagGet, createTagPost };
