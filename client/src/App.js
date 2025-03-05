import React, { Fragment } from 'react';
import './App.css';
import axios from 'axios';

//components

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const [auth, setAuth] = useState({});

  const login = async(credentials)=> {
    const { data } = await axios.post("https://joes-pern-todo-backend.onrender.com/login", credentials);
    console.log(data);
  };

  return (
    <Fragment>
      <div>
      {
        auth.id ? (
          <div className='container'>
            <InputTodo />
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