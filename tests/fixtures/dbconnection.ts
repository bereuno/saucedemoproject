require ('dotenv').config();
const mysql = require('mysql2/promise');


const dbConfig = {      
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

async function getConnection() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}

module.exports = { getConnection };
export {getConnection};