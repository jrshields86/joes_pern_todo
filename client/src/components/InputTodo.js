import React, { useState } from 'react';
import axios from 'axios';

const InputTodo = ({ auth, setAuth }) => {
    const [description, setDescription] = useState('');
    const id = auth.user_id;

    const capitalizeFirstLetter = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
    

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {
                description: description,
                id: id
            };
            const response = await axios.post('https://joes-pern-todo-backend.onrender.com/todos', body);
            window.location = "/";
        } catch (error) {
        }
    };

    const logout = ()=> {
        window.localStorage.removeItem('token');
        setAuth({});
    }

    return (
        <>
            <span>
                Welcome { capitalizeFirstLetter(auth.username) }!!
                <button onClick={ logout }>Logout</button>
            </span>
            <h1 className='text-center mt-5'>Todo List for { capitalizeFirstLetter(auth.username) }</h1>
            <form className='d-flex mt-5' onSubmit={onSubmitForm}>
                <input
                    type='text'
                    className='form-control'
                    value={description}
                    onChange={e => setDescription(e.target.value)}/>
                <button className='btn btn-success'>Add</button>
            </form>
        </>
    );
};

export default InputTodo; 