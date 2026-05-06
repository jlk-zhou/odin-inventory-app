const { Router } = require("express"); 
const tagsRouter = Router(); 
const tagsController = require("../controllers/tagsController"); 

// Create a new tag
tagsRouter.get("/new", tagsController.createTagGet); 
tagsRouter.post("/new", tagsController.createTagPost); 

// Update a tag
tagsRouter.get("/edit/:tagId", tagsController.editTagGet); 
tagsRouter.post("/edit/:tagId", tagsController.editTagPost)

// Delete a tag
tagsRouter.get("/delete/:tagId", tagsController.deleteTag); 

// Read a tag's recipes
tagsRouter.get("/:tagId", tagsController.showTagRecipes); 

// Show all tags
tagsRouter.get("/", tagsController.showAllTags); 

module.exports = tagsRouter; 