import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-auth';

const config = {
  apiKey: "AIzaSyCrdwWA92x1fGVX92qGH90n7vM_jb9S1rc",
  authDomain: "crown-db-d9e34.firebaseapp.com",
  projectId: "crown-db-d9e34",
  storageBucket: "crown-db-d9e34.appspot.com",
  messagingSenderId: "582406976635",
  appId: "1:582406976635:web:721c73148e8429156c1ede",
  measurementId: "G-DHXR3Z9XJZ"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

