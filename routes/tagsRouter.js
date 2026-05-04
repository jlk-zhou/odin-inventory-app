const { Router } = require("express"); 
const tagsRouter = Router(); 
const tagsController = require("../controllers/tagsController"); 

tagsRouter.get("/", tagsController.showAllTags); 

module.exports = tagsRouter; 