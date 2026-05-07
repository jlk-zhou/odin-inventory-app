const { body } = require("express-validator");

const emptyInputErr = "must not be empty.";
const lengthErr = (char) => `must not exceed ${char} characters.`;
const floatErr = "must be a number.";
const alphaErr = "must contain letters only.";

const validateRecipe = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Recipe title ${emptyInputErr}`)
    .isLength({ max: 50 })
    .withMessage(`Recipe title ${lengthErr(50)}`),
];

const validateRecipeSteps = [
  body("steps")
    .trim()
    .isLength({ max: 500 })
    .withMessage(`Recipe steps ${lengthErr(500)}`),
];

const validateRecipeTags = [
  body("tagId")
    .notEmpty()
    .withMessage("Please choose a tag."), 
]

const validateTag = [
  body("tagName")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Tag name ${emptyInputErr}`)
    .isLength({ max: 50 })
    .withMessage(`Tag name ${lengthErr(50)}`),
];

const validateIngredient = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Ingredient name ${emptyInputErr}`)
    .isLength({ max: 50 })
    .withMessage(`Ingredient name ${lengthErr(50)}`),
  body("quantity")
    .trim()
    .notEmpty()
    .withMessage(`Ingredient quantity ${emptyInputErr}`)
    .isFloat()
    .withMessage(`Ingredient quantity ${floatErr}`)
    .isLength({ max: 10 })
    .withMessage(`Ingredient quantity ${lengthErr(10)}`),

  body("unit")
    .optional({ values: "falsy"})
    .trim()
    .isLength({ max: 20 })
    .withMessage(`Ingredient unit ${lengthErr(20)}`)
    .isAlpha()
    .withMessage(`Ingredient unit ${alphaErr}`), 
];

module.exports = {
  validateRecipe,
  validateRecipeSteps,
  validateRecipeTags, 
  validateTag,
  validateIngredient,
};
