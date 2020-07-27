import React, { useState, useEffect } from 'react';
import 'materialize-css/dist/js/materialize'
import './App.css';
import { firebaseApp } from './firebase';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Feed from './components/Feed';
import Navbar from './components/reusable/Navbar'

function App() {

  const [stage, setStage] = useState('');
  const [signUpSignIn, setsignUpSignIn] = useState('SI');

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('User logged in');
        setStage('loggedIn');
        setsignUpSignIn('SI');
      }
      else {
        console.log('No User logged in');
        setStage('notLoggedIn');
      }
    });
  }, []);

  const changeState = (value) => {
    setsignUpSignIn(value);
  }


  return (
    <div className="App">
      <Navbar stage={stage} />

      {stage === 'loggedIn' && <Feed />}
      {stage === 'notLoggedIn' && signUpSignIn === 'SI' && <SignIn changeState={changeState} />}
      {stage === 'notLoggedIn' && signUpSignIn === 'SU' && <SignUp changeState={changeState} />}

    </div>
  );
}

export default App;
