import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo";
import axios from 'axios';

const ListTodos = ({ auth }) => {
    const [todos, setTodos] = useState([]);
    const userId = auth.user_id;

    //delete todo function

    const deleteTodo = async(id) => {
        try {
            const deleteTodo = await axios.delete(`https://joes-pern-todo-backend.onrender.com/todos/${id}`); 

            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (error) {
            console.error(error.message);
        }
    };

    const getTodos = async () => {
        try {
            const { data } = await axios.get("https://joes-pern-todo-backend.onrender.com/todos");
            console.log(data.filter(todo => todo.user_id === userId));
            setTodos(data.filter(todo => todo.user_id === userId));
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getTodos();
    }, [auth]);

    return (
        <>
            {" "}
            <table className="table mt-5 text-center">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {/* <tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                </tr> */}
                {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>
                                <EditTodo todo={todo} />
                            </td>
                            <td><button
                                    className="btn btn-danger"
                                    onClick={() => deleteTodo(todo.todo_id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>    
    );
};

export default ListTodos;