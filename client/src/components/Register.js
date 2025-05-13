import React, { useState } from "react";

const Register = ()=> {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 

    const createLogin = (ev) => {
        ev.preventDefault();
        
    };


    return (
        <>
            <div id='newLoginHeaderParentBox'>
                <h2> Or </h2>
                <h2 id ='newLoginHeader'>Create an Account</h2>
            </div>
            <div id='newLoginFormParentBox'>
                <form onSubmit={ createLogin }>
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