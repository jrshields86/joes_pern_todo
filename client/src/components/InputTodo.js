import React, { useState } from 'react';
import axios from 'axios';

const InputTodo = ({ auth, setAuth }) => {
    const [description, setDescription] = useState('');

    const onSubmitForm = async e => {
        e.preventDefault();
        console.log(e);
        try {
            const body = { description };
            const response = await axios.post('https://joes-pern-todo-backend.onrender.com/todos', body);
            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    };

    const logout = ()=> {
        window.localStorage.removeItem('token');
        setAuth({});
    }

    return (
        <>
            <span>
                Welcome { auth.username }!!
                <button onClick={ logout }>Logout</button>
            </span>
            <h1 className='text-center mt-5'>Joe's PERN Todo List</h1>
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