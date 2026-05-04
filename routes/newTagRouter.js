const { Router } = require("express"); 
const newTagRouter = Router(); 

const newTagController = require("../controllers/tagsController"); 

newTagRouter.get("/", newTagController.createTagGet); 
newTagRouter.post("/", newTagController.createTagPost); 

module.exports = newTagRouter; 