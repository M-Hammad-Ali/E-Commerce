import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDBcMA6ljAgo1wZEx56sJV4oMMFvTVd900",
  authDomain: "e-commerce-db-9cc7a.firebaseapp.com",
  databaseURL: "https://e-commerce-db-9cc7a.firebaseio.com",
  projectId: "e-commerce-db-9cc7a",
  storageBucket: "e-commerce-db-9cc7a.appspot.com",
  messagingSenderId: "1028121019877",
  appId: "1:1028121019877:web:5c60e3e670ec8de8cf9b0c",
  measurementId: "G-9G27EQF1EY"
};

export const createUserProfileDocument = async(userAuth,additionalData) => {
  if(!userAuth) return;

  console.log(userAuth);

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const {displayName,email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(err){
      console.log("Error Creating User",err.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle = ()=> auth.signInWithPopup(provider);
export const forgetPassword = (email) => auth.sendPasswordResetEmail(email)

export default firebase;
