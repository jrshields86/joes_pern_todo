const express = require("express");
const app = express();
const cors = require("cors");
const client = require("./db");

const {
    authenticate,
    findUserByToken,
    getTodos,
    makeNewTodo,
    deleteTodo
} = require('./db');


//middleware
app.use(cors());
app.use(express.json());  //req.body

//ROUTES//

//create a todo

app.post("/todos", async(req, res, next) => {
    try {
        const { description } = req.body;
        res.send(await makeNewTodo(description));
    } catch (ex) {
        next(ex);
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

app.get('/todos', async(req,res,next) => {
    try {
        res.send(await getTodos());
    } catch (error) {
        console.error(error.message);
    }
});

//get a todo

app.get("/todos/:id", async (req, res, next) => {
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

app.delete("/todos/:id", async (req, res, next) => {
    console.log('testing delete route');
    try {
        const { id } = req.params;
        res.send(await deleteTodo(id));
    } catch (ex) {
        next(ex);
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`)
    
});




