import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store} from "./redux";
import {Provider} from 'react-redux'
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import {createContext} from "react";

firebase.initializeApp({
    apiKey: "AIzaSyAnrHDsMy1ldNwd4Rm5RZeRnKdpPtfaqZs",
    authDomain: "project-new-228.firebaseapp.com",
    projectId: "project-new-228",
    storageBucket: "project-new-228.appspot.com",
    messagingSenderId: "760940428377",
    appId: "1:760940428377:web:f24fb5dc2af5276d018548",
    measurementId: "G-D20LFPTMZ6"
});

export const Context = createContext(null)

const auth = firebase.auth()
// const firestore = firebase.firestore()

ReactDOM.render(

    <React.StrictMode>
        <Context.Provider value={{
            firebase,
            auth
        }}>
            <Provider store={store}>
                <App/>
            </Provider>
        </Context.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

