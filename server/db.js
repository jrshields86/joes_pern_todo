const Pool = require("pg").Pool;
const dotenv = require('dotenv').config();

const pool = new Pool({
    user: process.env.PSQL_USER,
    password: process.env.PSQL_PASSWORD,
    host: process.env.PSQL_HOST,
    port: process.env.PSQL_PORT,
    database: process.env.PSQL_DATABASE
});

module.exports = pool;