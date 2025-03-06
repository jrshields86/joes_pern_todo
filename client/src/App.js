import React, { Fragment, useEffect } from 'react';
import './App.css';
import axios from 'axios';

//components

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const [auth, setAuth] = useState({});

  useEffect(()=> {
    const attemptLoginWithToken = async()=> {
      const token = window.localStorage.getItem('token');
        if(token){
          const response = await axios.get('https://joes-pern-todo-backend.onrender.com/me', {
            headers: {
              authorization: token
            }
      });
      setAuth(response.data);
    }
    };
    attemptLoginWithToken();
  }, []);

  const login = async(credentials)=> {
    let response = await axios.post("https://joes-pern-todo-backend.onrender.com/login", credentials);
    const { token } = response.data;
    window.localStorage.setItem('token', token);

    response = await axios.get('https://joes-pern-todo-backend.onrender.com/me', {
      headers: {
        authorization: token
      }
    });
    setAuth(response.data);
  };

  return (
    <Fragment>
      <div>
      {
        auth.user_id ? (
          <div className='container'>
            <InputTodo auth={ auth } setAuth={ setAuth }/>
            <ListTodos />
          </div>
        ):(
        <Login login={ login }/>
        )
      }
      </div>
    </Fragment>);
}

export default App;