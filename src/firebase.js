// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";

//   import { initializeApp } from '../node_modules/firebase/app';
//   import { getFirestore } from '../node_modules/firebase/app';

import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyBFaU2XpTr0w7CdygvnKLvJMv0qdSRTu3k",
authDomain: "pozosppjdatabase.firebaseapp.com",
projectId: "pozosppjdatabase",
storageBucket: "pozosppjdatabase.appspot.com",
messagingSenderId: "895345772809",
appId: "1:895345772809:web:84bedc4b4c6c051db7ebd8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

//   console.log(db);