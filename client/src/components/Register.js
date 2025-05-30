import axios from "axios";
import React, { useState } from "react";

const Register = ({ createNewLogin })=> {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 

    const createLoginSubmitForm = async (ev) => {
        ev.preventDefault();
        try {
            const newUser = {
            username: username,
            password: password
        };
        console.log(newUser);
        const response = await axios.post('https://joes-pern-todo-backend.onrender.com/users', newUser);
        window.alert('New Login Created');
        } catch (error) {
            
        }
    };


    return (
        <>
            <div id='newLoginHeaderParentBox'>
                <h2 id ='newLoginHeader'>Create an Account</h2>
            </div>
            <div id='newLoginFormParentBox'>
                <form onSubmit={ createLoginSubmitForm } id='createLoginForm'>
                    <input
                        id='createLoginFormInput'
                        placeholder="create username"
                        value={username}
                        onChange={ev => setUsername(ev.target.value)}
                    />
                    <input
                        id='createLoginFormInput'
                        placeholder="create password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <button disabled={!username || !password}>Submit</button>
                </form>
            </div>
        </>
    )
};

export default Register;