const { Client } = require('pg');
const { useResolvedPath } = require('react-router-dom');
const client = new Client(process.env.DATABASE_URL || {
    user: 'jrshields86',
    host: 'localhost',
    database: 'joes_perntodo_db',
    port: 5432,
    password: "Bl@ckonyx1239"
});

const createUser = async(user) => {
    if(!user.username || !user.password){
        throw Error('must have username and password');
    }
    const SQL = `
        INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *
    `;
    const response = await client.query(SQL, [user.username, user.password ]);
    return response.rows[0];
};

const setup = async() => {
    await client.connect();
    console.log('connected to the database');
    const SQL = `
        DROP TABLE IF EXISTS todo;
        DROP TABLE IF EXISTS users;

        CREATE TABLE users(
            user_id SERIAL PRIMARY KEY,
            created_at TIMESTAMP DEFAULT now(),
            username VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL
        );

        CREATE TABLE todo(
            todo_id SERIAL PRIMARY KEY,
            description VARCHAR(255)
        );

        INSERT INTO todo(description) VALUES ('clean my car');
        INSERT INTO todo(description) VALUES ('ride my bike');
        INSERT INTO todo(description) VALUES ('walk the dog');

        INSERT INTO users(username, password) VALUES ('joe', 1234);
        
    `;
    await client.query(SQL);

    const [moe, lucy, ethyl] = await Promise.all([
        createUser({ username: 'moe', password: 'm_password'}),
        createUser({ username: 'lucy', password: 'l_password'}),
        createUser({ username: 'ethyl', password: 'e_password'}),
    ]);
    console.log('create tables and seed data');
};

setup();

module.exports = client;