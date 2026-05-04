const { Client } = require("pg");
require("dotenv").config();
const { argv } = require("node:process");

const CREATE_TABLES = `
CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  name VARCHAR(255) 
); 

CREATE TABLE IF NOT EXISTS recipes (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  tag INTEGER REFERENCES tags(id), 
  title VARCHAR(255), 
  ingredients JSONB
); 

CREATE TABLE IF NOT EXISTS ingredients (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  name VARCHAR(255)
); 
`;

async function main() {
  let connectionString;
  const option = argv[2];
  switch (option) {
    case option === "-p" || option === "--production":
      connectionString = process.env.DB_PROD;
      break;
    case option === "-d" || option === "--development":
      connectionString = process.env.DB_DEV;
      break;
    default:
      console.log(`Usage: node populatedb.js -[-p]roduction/-[-d]evelopment`);
  }
  console.log("Creating tables...");
  const client = new Client({
    connectionString: connectionString,
  });
  await client.connect();
  await client.query(CREATE_TABLES);
  await client.end();
  console.log(`Tables created.`);
}

main();
