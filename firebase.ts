// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // for authentication
import 'firebase/compat/firestore'; // for cloud firestore
import 'firebase/compat/storage'; // for cloud storage
import 'firebase/compat/analytics'; // for analytics
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAF41v2i5HA9KiirdK_lcKUSwPpSzJMNLs",
  authDomain: "salsabil-blog.firebaseapp.com",
  projectId: "salsabil-blog",
  storageBucket: "salsabil-blog.appspot.com",
  messagingSenderId: "940980923962",
  appId: "1:940980923962:web:616e5f9825f7dd9365cf03",
  measurementId: "G-Q7REZH3Q0P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;