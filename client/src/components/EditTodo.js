import React, { useState } from "react"
import axios from 'axios';

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description);
    //edit description function

    const updateDescription = async (e) => {
        e.preventDefault();
        
        try {
            const body = {
                "todo_id": todo.todo_id,
                "description": description 
            };
            const response = await axios.put(`https://joes-pern-todo-backend.onrender.com/todos/${todo.todo_id}`, body);

            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    }
    


    return (
        <>
            <button
            type="button"
            className="btn btn-warning"
            data-toggle="modal" 
            data-target={`#id${todo.todo_id}`}
            >
            Edit
            </button>

            {/*
                id = id10
            */}
            
            <div
                className="modal"
                id={`id${todo.todo_id}`}
                onClick={() => setDescription(todo.description)}
            >
            <div className="modal-dialog">
                <div className="modal-content">
            
                <div className="modal-header">
                    <h4 className="modal-title">Edit Todo</h4>
                    <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        onClick={() => setDescription(todo.description)}
                    >
                        &times;
                    </button>
                </div>
            
                <div className="modal-body">
                    <input
                    type="text"
                    className="form-control" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                    />
                </div>
            
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-warning"
                        data-dismiss="modal"
                        onClick={e => updateDescription(e)}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        data-dismiss="modal"
                        onClick={() => setDescription(todo.description)}
                    >
                        Close
                    </button>
                </div>
            
                </div>
            </div>
            </div>
        </>
    );
};

export default EditTodo;