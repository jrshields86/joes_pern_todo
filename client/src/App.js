import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

//components

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import Login from './components/Login';

function App() {
  const [auth, setAuth] = useState({});

  const login = async(credentials)=> {
    console.log(credentials);
    const response = await axios.post('/login', credentials);
  };

  return (
    <>
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
    </>);
}

export default App;
