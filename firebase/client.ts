// Import the functions you need from the SDKs you need
import { initializeApp,getApp, } from "firebase/app";
import  {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFq_n_32erbnryWLaXk4plxUoyafv1Vzg",
  authDomain: "prepwise-98796.firebaseapp.com",
  projectId: "prepwise-98796",
  storageBucket: "prepwise-98796.firebasestorage.app",
  messagingSenderId: "881990304722",
  appId: "1:881990304722:web:72f6b49cfa1e441c81be0b",
  measurementId: "G-T0CVMFQW6W"
};

// Initialize Firebase
const app = !getApp.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);