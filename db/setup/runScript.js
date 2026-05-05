const { Client } = require("pg"); 
const { argv } = require("node:process");
const { dbSwitch } = require("./dbSwitch");

async function runScript(script) {
  const connectionString = dbSwitch(argv[2]);
  if (!connectionString) {
    return;
  }

  const client = new Client({
    connectionString: connectionString,
  });
  await client.connect();
  await client.query(script);
  await client.end();
  console.log("Success."); 
}

module.exports = { runScript };
