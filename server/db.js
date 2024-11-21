const pg = require('pg');
const client = new pg.Client('postgres://localhost/joes_perntodo_db');

const setup = async() => {
    await client.connect();
    console.log('connected to the database');
};

setup();

module.exports = client;