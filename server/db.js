const Pool = require("pg").Pool;

const pool = new Pool({
    user: "jrshields86",
    password: "",
    host: "localhost",
    port: 5432,
    database: "joes_perntodo_db"
});

module.exports = pool;