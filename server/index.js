const express = require("express");
const app = express();
const cors = require("cors");
const client = require("./db");

const {
    authenticate,
    findUserByToken,
    getTodos
} = require('./db');


//middleware
app.use(cors());
app.use(express.json());  //req.body

//ROUTES//

//create a todo

app.post("/todos", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await client.query("INSERT INTO todos (description) VALUES($1) RETURNING * ",
            [description]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

//user login route

app.post('/login', async(req, res, next)=> {
    console.log(req.body);
    try {
        res.send(await authenticate(req.body));
    } catch (ex) {
        next(ex);
    }
});

//new route for auth

app.get('/me', async(req, res, next)=> {
    try {
        res.send(await findUserByToken(req.headers.authorization));
    } catch (ex) {
        next(ex);
    }
    
});

//get all todos

app.get('/todos', async(req,res,) => {
    console.log(res);
    console.log('app get');
    res.send(await getTodos());
    // try {
    //     const allTodos = await client.query("SELECT * FROM todos");
    //     res.send(allTodos.rows);
    // } catch (error) {
    //     console.error(error.message);
    // }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await client.query("SELECT * FROM todos WHERE todo_id = $1", [id]);

        res.json(todo.rows[0]);
    } catch (error) {           
        console.error(error.message);        
    }
});

//update a todo

app.put("/todos/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await client.query("UPDATE todos SET description = $1 WHERE todo_id = $2", [description, id]);

        res.json("Todo has been updated!");
    } catch (error) {
        console.error(error.message);
    }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await client.query("DELETE FROM todos WHERE todo_id = $1", [id]);

        res.json("Todo was deleted!")
    } catch (error) {
        console.error(error.message);
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`)
    
});




