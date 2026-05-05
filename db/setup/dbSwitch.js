require("dotenv").config();

function dbSwitch(option) {
  let connectionString;
  if (option === "-p" || option === "--production") {
    connectionString = process.env.DB_PROD;
  } else if (option === "-d" || option === "--development") {
    connectionString = process.env.DB_DEV;
  } else {
    console.log(`Usage: node script.js -[-p]roduction/-[-d]evelopment`);
    return;
  }
  return connectionString;
}

module.exports = { dbSwitch };
