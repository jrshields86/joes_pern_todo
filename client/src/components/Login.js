import React, { useState, Fragment } from 'react';

const Login = ({ login })=> {
    console.log(login);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const _login = (ev)=> {
        ev.preventDefault();
        login({ username, password });
    };

    return (
        <Fragment>
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
        </Fragment>
    );
};

export default Login;