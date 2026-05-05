const { runScript } = require("./runScript");

const CREATE_TABLES = `
CREATE TABLE IF NOT EXISTS recipes (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  title VARCHAR(255), 
  steps VARCHAR(255) DEFAULT NULL 
); 

CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  name VARCHAR(255) 
); 

CREATE TABLE IF NOT EXISTS ingredients (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  name VARCHAR(255) 
); 

CREATE TABLE IF NOT EXISTS recipes_tags (
  recipe_id INTEGER REFERENCES recipes(id), 
  tag_id INTEGER REFERENCES tags(id) 
); 

CREATE TABLE IF NOT EXISTS recipes_ingredients (
  recipe_id INTEGER REFERENCES recipes(id), 
  ingredient_id INTEGER REFERENCES ingredients(id), 
  quantity FLOAT DEFAULT 0, 
  unit VARCHAR(255) DEFAULT NULL
); 
`;

async function main() {
  console.log("Creating tables...");
  await runScript(CREATE_TABLES);
}

main();
