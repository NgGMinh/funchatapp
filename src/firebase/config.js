import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDnAwa5w8Yr-90h0QRn2V0I_oPIMQpb8FY",
    authDomain: "chat-app-42c9b.firebaseapp.com",
    projectId: "chat-app-42c9b",
    storageBucket: "chat-app-42c9b.appspot.com",
    messagingSenderId: "803529409697",
    appId: "1:803529409697:web:06c6f4ba56425603101ce0",
    measurementId: "G-SCE2H72LFH"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
const storage =  firebase.storage();


if (window.location.hostname === 'localhost'){
  // auth.useEmulator('http://localhost:9099');
  // db.useEmulator('localhost', '8080');
  // storage.useEmulator('localhost', '9199');
}

export { db, auth, storage };
export default firebase;