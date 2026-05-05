const { runScript } = require("./runScript"); 

const DELETE_TABLES = `
DROP TABLE IF EXISTS recipes, tags, ingredients, recipes_tags, recipes_ingredients;
`

async function main() {
  console.log("Deleting tables..."); 
  await runScript(DELETE_TABLES); 
}

main();
