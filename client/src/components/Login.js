import React, { useState } from 'react';
import '../App.css';

const Login = ({ login })=> {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const _login = (ev)=> {
        ev.preventDefault();
        login({ username, password });
    };

    return (
        <>
            <div id='loginHeaderParentBox'>
                <div id='loginHeader'>
                    Login
                </div>
            </div>
            <div id='loginFormParentBox'>
                <form onSubmit={ _login } id='loginForm'>
                    <input
                        id='loginFormInput'
                        placeholder='username' 
                        value={ username }
                        onChange={ ev => setUsername(ev.target.value)}
                    />
                    <input
                        id='loginFormInput'
                        type='password' 
                        placeholder='password' 
                        value={ password }
                        onChange={  ev => setPassword(ev.target.value)}
                    />
                    <button disabled={!username || !password}>Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;