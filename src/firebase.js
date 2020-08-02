import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDTb-l7D4VSR2LROJhEsxXPaAyqG1fNrxY",
    authDomain: "facebook-clone-55810.firebaseapp.com",
    databaseURL: "https://facebook-clone-55810.firebaseio.com",
    projectId: "facebook-clone-55810",
    storageBucket: "facebook-clone-55810.appspot.com",
    messagingSenderId: "141390730016",
    appId: "1:141390730016:web:388e91b078ab016e8efd45",
    measurementId: "G-JHTMH1DNWX"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const userRef = firebaseApp.database().ref('users');

export const postRef = firebaseApp.database().ref('posts');

export const storageRef = firebaseApp.storage();

