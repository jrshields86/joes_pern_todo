import React, { useState } from "react";

const Register = ()=> {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 


    return (
        <>
            <div>
                <h2>Create an Account</h2>
                <form>
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
                </form>
            </div>
        </>
    )
};

export default Register;