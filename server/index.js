const express = require("express");
const app = express();
const cors = require("cors");
const client = require("./db");

const {
    authenticate,
    findUserByToken,
    getTodos,
    makeNewTodo,
    deleteTodo,
    singleTodo,
    updateTodo,
    createUser,
    getAllUsers
} = require('./db');


//middleware
app.use(cors());
app.use(express.json());  //req.body

//ROUTES//

//create a todo

app.post("/todos", async(req, res, next) => {
    try {
        console.log(req.body);
        const { description } = req.body;
        const { id } = req.body;
        res.send(await makeNewTodo(description, id));
    } catch (ex) {
        next(ex);
    }
});

app.get("/users", async(req, res, next) => {
    try {
        res.send(await getAllUsers());
    } catch (ex) {
        next(ex);
    }
});

app.post("/users", async(req, res, next) => {
    try {
        const user = req.body;
        res.send(createUser(user));
    } catch (ex) {
        next(ex);        
    }
});

//user login route

app.post('/login', async(req, res, next)=> {
    try {
        const token = await authenticate(req.body);
        res.send({ token });
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

app.get('/todos', async(req, res, next) => {
    try {
        const user = await findUserByToken(req.headers.authorization);
        res.send(await getTodos(user.user_id));
    } catch (error) {
        console.error(error);
    }
});

//get a todo

app.get("/todos/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        res.send(await singleTodo(id));
    } catch (ex) {           
        next(ex);        
    }
});

//update a todo

app.put("/todos/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        res.send(await updateTodo(id, description));
    } catch (ex) {
        next(ex);
    }
});

//delete a todo

app.delete("/todos/:id", async (req, res, next) => {
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




