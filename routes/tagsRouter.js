const { Router } = require("express"); 
const tagsRouter = Router(); 
const tagsController = require("../controllers/tagsController"); 

tagsRouter.get("/", tagsController.showAllTags); 
tagsRouter.get("/edit/:tagId", tagsController.editTagGet); 
tagsRouter.post("/edit/:tagId", tagsController.editTagPost)
tagsRouter.get("/delete/:tagId", tagsController.deleteTag); 

module.exports = tagsRouter; 