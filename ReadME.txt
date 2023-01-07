npm init
create database (ph*, Su*)
create table
 npm i express dotenv mysql2

 https://www.npmjs.com/package/mysql2
    (MySQL2 also exposes a .promise() function on Pools, so you can create a promise/non-promise connections from the same pool)
//INFO:TODO:INFO:
async function main() {
  // get the client
  const mysql = require('mysql2');
  // create the pool
  const pool = mysql.createPool({
    host:'localhost', 
    user: 'root', 
    password: process.env.DB_PASSWORD, //INFO:TODO:INFO:
    database: 'test'});
  // now get a Promise wrapped instance of that pool
  const promisePool = pool.promise();
  // query database using promises
  const [rows,fields] = await promisePool.query("SELECT 1");
//INFO:TODO:INFO:





https://youtu.be/oK5AfB7qX-s