const { Client } = require('pg');
const client = new Client(process.env.DATABASE_URL || {
    user: 'jrshields86',
    host: 'localhost',
    database: 'joes_perntodo_db',
    port: 5432,
    password: "Bl@ckonyx1239"
});

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