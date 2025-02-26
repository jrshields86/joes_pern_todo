import React, { useState } from 'react';

const Login = ()=> {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form>
            <input
                placeholder='username' 
                value={ username }
                onChange={ev => setUsername(ev.target.value)}
            />
            <input
                type='password' 
                placeholder='password' 
                value={ password }
                onChange={ev => setPassword(ev.target.value)}
            />
            <button>Login</button>
        </form>
    );
};

export default Login;