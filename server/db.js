const { Client } = require('pg');
const { useResolvedPath, UNSAFE_NavigationContext } = require('react-router-dom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = new Client(process.env.DATABASE_URL || {
    user: 'jrshields86',
    host: 'localhost',
    database: 'joes_perntodo_db',
    port: 5432,
    password: "Bl@ckonyx1239"
});

const getTodos = async(userId)=> {
    console.log(userId);
    const SQL = `
        SELECT *
        FROM todos
        WHERE user_id = $1
    `;
    const response = await client.query(SQL, [userId]);
    return response.rows;
};

const makeNewTodo = async(description, id)=> {
    console.log(id);
    const SQL = `
        INSERT INTO todos (description, user_id) VALUES ($1, $2) RETURNING *
    `;
    const { rows } = await client.query(SQL, [description, id])
    return rows;
};

const deleteTodo = async(id)=> {
    const SQL = `
        DELETE FROM todos
        WHERE todo_id = $1
    `;
    const response = await client.query(SQL, [id]);
    return `Item: ${id} Deleted`
};

const singleTodo = async(id)=> {
    const SQL = `
        SELECT description
        FROM todos
        WHERE todo_id = $1
    `;
    const response = await client.query(SQL, [id]);
    return response.rows[0];
};

const updateTodo = async(id, description)=> {
    const SQL = `
        UPDATE todos
        SET description = $1
        WHERE todo_id = $2
        RETURNING *
    `;
    const response = await client.query(SQL, [description, id]);
    return response.rows[0];
};

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

const findUserByToken = async(token)=> {
    try {
        const payload = await jwt.verify(token, process.env.JWT);
        const SQL = `
        SELECT user_id, username
        FROM users
        WHERE user_id = $1
    `;
        const response = await client.query(SQL, [payload.user_id]);
        if(!response.rows.length){
            const error = Error('bad credentials');
            error.status = 401;
            throw error;
        };

        return response.rows[0];
    } catch (ex) {
        console.log(ex);
        const error = Error('bad credentials');
        error.status = 401;
        throw error;
    }
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
};

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
            description VARCHAR(255),
            user_id INTEGER REFERENCES users(user_id)
        );

        INSERT INTO todos(description, user_id) VALUES ('clean my car',(SELECT user_id FROM users WHERE username ='moe'));
        INSERT INTO todos(description, user_id) VALUES ('ride my bike',(SELECT user_id FROM users WHERE username ='lucy'));
        INSERT INTO todos(description, user_id) VALUES ('walk the dog',(SELECT user_id FROM users WHERE username ='ethyl'));
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

module.exports = {
    client,
    authenticate,
    findUserByToken,
    getTodos,
    makeNewTodo,
    deleteTodo,
    singleTodo,
    updateTodo
};