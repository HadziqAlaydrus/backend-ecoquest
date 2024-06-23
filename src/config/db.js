const {Pool} = require('pg');
require('dotenv').config();

console.log("Database URL: ", process.env.POSTGRES_URL);
console.log("Database Password Type: ", typeof process.env.DB_PASSWORD);

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});



module.exports = {
    query: (text, params) => pool.query(text, params),
}