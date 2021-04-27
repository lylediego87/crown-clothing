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

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const getCurrentUser = () => {
  return new Promise((reslove, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      reslove(userAuth);
    },reject)
  })
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`); 
  const snapShot = await userRef.get();
  
  if(!snapShot.exists){
    const { displayName, email }  = userAuth;
    const createdAt = new Date();
    const cartItems = [];
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        cartItems,
        ...additionalData
      })
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
}

export const persistCartToFirestore = async (items) => {
  const userAuth = await getCurrentUser();
  const userRef = firestore.doc(`users/${userAuth.uid}`); 
  try {
    userRef.set({cartItems: items },{merge: true});
  } catch (error) {
    console.log("error persisteing cart", error.message);
  }
}

export const convertColletionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items} = doc.data();
    return { 
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title: title,
      items:items
    }
  });
  
  return transformedCollection.reduce((accumulater,collection) => {
    accumulater[collection.title.toLowerCase()] = collection;
    return accumulater;
  }, {})
}

// Function used to insert shop data into firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef); 

  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
}

export default firebase;

