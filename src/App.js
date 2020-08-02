import React, { useState, useEffect } from 'react';
import 'materialize-css/dist/js/materialize'
import './App.css';
import { firebaseApp, userRef } from './firebase';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Feed from './components/Feed';
import Navbar from './components/reusable/Navbar'
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProfilePage from './components/ProfilePage';

function App() {

  const [stage, setStage] = useState('');
  const [signUpSignIn, setsignUpSignIn] = useState('SI');
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('User logged in');
        userRef.child(user.uid).once('value', snap => {
          setUserDetails(snap.val())
        })
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

      <Router>
        <Route path='/' exact>
          {stage === 'loggedIn' && <Feed userDetails={userDetails} />}
          {stage === 'notLoggedIn' && signUpSignIn === 'SI' && <SignIn changeState={changeState} />}
          {stage === 'notLoggedIn' && signUpSignIn === 'SU' && <SignUp changeState={changeState} />}
        </Route>

        <Route path='/:uid'>
          <div><ProfilePage /></div>
        </Route>
      </Router>


    </div>
  );
}

export default App;
