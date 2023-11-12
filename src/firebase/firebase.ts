import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3k88RwYn5UP_bVB7vmfXJwBiarfQet1E",
  authDomain: "chatharbor.firebaseapp.com",
  projectId: "chatharbor",
  storageBucket: "chatharbor.appspot.com",
  messagingSenderId: "977362796965",
  appId: "1:977362796965:web:93a63a6e5769d2e50a684c",
};

// Initialize Firebase app if not already initialized with the same config object as the web app config object above (firebaseConfig)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { auth, db, functions };
