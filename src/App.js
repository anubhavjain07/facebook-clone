import React, { useEffect } from 'react';
import './App.css';
import { userRef } from './firebase';
import signUp from './api/signUp';
import signIn from './api/signIn';

function App() {

  // useEffect(() => {
  //   function callFunc() {
  //     userRef.push({
  //       email: 'anu1@anu.com',
  //       password: '12345'
  //     })
  //   }
  //   callFunc();
  // }, []);


  const onSignUp = () => {
    const result = signUp('anu6@anu.com', '123456', 'Anubhav', 'Jain');
    console.log(result);
  }
  const onSignIn = () => {
    const result = signIn('anu6@anu.com', '123456');
    console.log(result);
  }


  return (
    <div className="App">
      <button onClick={() => onSignUp()}>Sign Up</button>
      <button onClick={() => onSignIn()}>Sign In</button>
    </div>
  );
}

export default App;
