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
        console.log(response);
        } catch (error) {
            
        }
    };


    return (
        <>
            <div id='newLoginHeaderParentBox'>
                <h2> Or </h2>
                <h2 id ='newLoginHeader'>Create an Account</h2>
            </div>
            <div id='newLoginFormParentBox'>
                <form onSubmit={ createLoginSubmitForm }>
                    <input
                        placeholder="create username"
                        value={username}
                        onChange={ev => setUsername(ev.target.value)}
                    />
                    <input
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