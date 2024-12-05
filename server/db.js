const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/joes_perntodo_db');

const setup = async() => {
    await client.connect();
    console.log('connected to the database');
    const SQL = `

    DROP TABLE IF EXISTS todo;
        CREATE TABLE todo(
        todo_id SERIAL PRIMARY KEY,
        description VARCHAR(255)
    );
    INSERT INTO todo(description) VALUES ('clean my car');
    INSERT INTO todo(description) VALUES ('ride my bike');
    INSERT INTO todo(description) VALUES ('walk the dog');
    `;
    await client.query(SQL);
    console.log('create tables and seed data');
};

setup();

module.exports = client;