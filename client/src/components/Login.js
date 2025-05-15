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
                <h2 id='loginHeader'>
                    Login
                </h2>
            </div>
            <div id='loginFormParentBox'>
                <form onSubmit={ _login }>
                    <input
                        placeholder='username' 
                        value={ username }
                        onChange={ ev => setUsername(ev.target.value)}
                    />
                    <input
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