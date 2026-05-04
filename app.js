const express = require("express");
const app = express();
const path = require("node:path");
require("dotenv").config();

const tagsRouter = require("./routes/tagsRouter");
const newTagRouter = require("./routes/newTagRouter"); 
const newRecipeRouter = require("./routes/newRecipeRouter"); 
const indexRouter = require("./routes/indexRouter"); 

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/tags", tagsRouter); 
app.use("/new_tag", newTagRouter); 
app.use("/new_recipe", newRecipeRouter); 
app.use("/", indexRouter); 

const PORT = process.env.PORT_EXPRESS || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Inventory app - listening on port ${PORT}`);
});
