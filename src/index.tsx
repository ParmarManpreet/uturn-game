import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB7DLyA410nmu5iwSKAaaYffa_qhAuw_Yo",
  authDomain: "u-turn-development.firebaseapp.com",
  databaseURL: "https://u-turn-development-default-rtdb.firebaseio.com",
  projectId: "u-turn-development",
  storageBucket: "u-turn-development.appspot.com",
  messagingSenderId: "1047610039658",
  appId: "1:1047610039658:web:f7a9c58422ec8150e01913",
  measurementId: "G-Z4D3Z5D2XL"
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)
//export const storageRef = ref(storage)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();