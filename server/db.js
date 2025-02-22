const { Client } = require('pg');
const { useResolvedPath } = require('react-router-dom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = new Client(process.env.DATABASE_URL || {
    user: 'jrshields86',
    host: 'localhost',
    database: 'joes_perntodo_db',
    port: 5432,
    password: "Bl@ckonyx1239"
});

const createUser = async(user) => {
    if(!user.username.trim() || !user.password.trim() ){
        throw Error('must have username and password');
    }
    user.password = await bcrypt.hash(user.password, 5);
    const SQL = `
        INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *
    `;
    const response = await client.query(SQL, [user.username, user.password ]);
    return response.rows[0];
};

const authenticate = async(credentials)=> {
    const SQL = `
        SELECT user_id, password
        FROM users
        WHERE username = $1
    `;
    const response = await client.query(SQL, [credentials.username]);
    if(!response.rows.length){
        const error = Error('bad credentials');
        error.status = 401;
        throw error;
    }
    const valid = await bcrypt.compare(credentials.password, response.rows[0].password)
    if(!valid){
        const error = Error('bad credentials');
        error.status = 401;
        throw error;
    }
    return jwt.sign({ user_id: response.rows[0].user_id }, process.env.JWT);
}

const setup = async() => {
    await client.connect();
    console.log('connected to the database');
    const SQL = `
        DROP TABLE IF EXISTS todos;
        DROP TABLE IF EXISTS users;

        CREATE TABLE users(
            user_id SERIAL PRIMARY KEY,
            created_at TIMESTAMP DEFAULT now(),
            username VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL
        );

        CREATE TABLE todos(
            todo_id SERIAL PRIMARY KEY,
            description VARCHAR(255)
        );

        INSERT INTO todos(description) VALUES ('clean my car');
        INSERT INTO todos(description) VALUES ('ride my bike');
        INSERT INTO todos(description) VALUES ('walk the dog');        
    `;
    await client.query(SQL);

    const [moe, lucy, ethyl] = await Promise.all([
        createUser({ username: 'moe', password: 'm_password' }),
        createUser({ username: 'lucy', password: 'l_password' }),
        createUser({ username: 'ethyl', password: '1234' }),
    ]);
    console.log('create tables and seed data');
};

setup();

module.exports = {client, authenticate};