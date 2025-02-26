import React, { Fragment } from 'react';
import './App.css';

//components

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const [auth, setAuth] = useState({});
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
        <Login />
        )
      }
      </div>
    </Fragment>);
}

export default App;
