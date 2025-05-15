import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

//components

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [auth, setAuth] = useState({});

  const attemptLoginWithToken = async()=> {
    const token = window.localStorage.getItem('token');
      if(token){
        try {
          const response = await axios.get('https://joes-pern-todo-backend.onrender.com/me', {
            headers: {
              authorization: token
            }
      });
      setAuth(response.data);
        } catch (ex) {
          if(ex.response.status === 401){
            window.localStorage.removeItem('token');
          }
          }
  }
  };

  useEffect(()=> {
    attemptLoginWithToken();
  }, []);

  const login = async (credentials)=> {
    const response = await axios.post("https://joes-pern-todo-backend.onrender.com/login", credentials);
    const { token } = response.data;
    window.localStorage.setItem('token', token);
    attemptLoginWithToken();
  };

  const createNewLogin = async (newUser) => {
    
  };

  return (
    <>
      {
        auth.user_id ? (
          <div className='container'>
            <InputTodo auth={ auth } setAuth={ setAuth } />
            <ListTodos auth={ auth } />
          </div>
        ):(
          <div id="landingPageParentBox">
            <div id="landingHeaderParentBox">
                <h1 id="landingHeader">
                    Welcome to Your Todo
                </h1>
            </div>
            <div id='loginBoxParentBox'>
              <Login login={ login }/>
              <div id="landingPageOrBox">
                <div id="landingPageOr"> Or </div>
              </div>
              <Register createNewLogin={ createNewLogin } />
            </div>
        </div>
        )
      }
    </>);
}

export default App;