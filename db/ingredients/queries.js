const pool = require("../pool");

// Create queries
async function addNewIngredient(name) {
  const { rows } = await pool.query(
    "INSERT INTO ingredients (name) VALUES ($1) RETURNING id; ",
    [name],
  );
  return rows[0].id;
}

async function addIngredientToRecipe(recipeId, ingredientId, quantity, unit) {
  await pool.query(
    `
    INSERT INTO recipes_ingredients (recipe_id, ingredient_id, quantity, unit)
      VALUES (($1), ($2), ($3), ($4)); 
    `,
    [recipeId, ingredientId, quantity, unit],
  );
}

// Read queries
async function getIngredientsByRecipe(recipeId) {
  const { rows } = await pool.query(
    `
    SELECT ingredients.id, name, quantity, unit
    FROM recipes_ingredients
    JOIN ingredients
    ON ingredient_id = ingredients.id
    WHERE recipe_id = ($1); 
    `,
    [recipeId],
  );
  return rows;
}

// Delete queries
async function deleteIngredient(recipeId, ingredientId) {
  await pool.query(
    `
    DELETE FROM recipes_ingredients
    WHERE recipe_id = ($1) AND ingredient_id = ($2);
    `,
    [recipeId, ingredientId],
  );
  await pool.query(
    `
    DELETE FROM ingredients
    WHERE id = ($1); 
    `,
    [ingredientId],
  );
}

module.exports = {
  addNewIngredient,
  addIngredientToRecipe,
  getIngredientsByRecipe,
  deleteIngredient,
};
