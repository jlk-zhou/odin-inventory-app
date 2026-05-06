// Setup app
const express = require("express");
const app = express();
const path = require("node:path");
require("dotenv").config();

// Import routers
const recipesRouter = require("./routes/recipesRouter");
const ingredientsRouter = require("./routes/ingredientsRouter");
const tagsRouter = require("./routes/tagsRouter");
const indexRouter = require("./routes/indexRouter");

// Set up view and form engines
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Use routers
app.use("/recipes", recipesRouter);
app.use("/recipes/ingredients", ingredientsRouter); 
app.use("/tags", tagsRouter);
app.use("/", indexRouter);

// Start server
const PORT = process.env.PORT_EXPRESS || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Inventory app - listening on port ${PORT}`);
});
