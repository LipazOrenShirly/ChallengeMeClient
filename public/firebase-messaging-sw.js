importScripts('https://www.gstatic.com/firebasejs/7.14.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.3/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyA-3U2Iz3Uck2ayvI7VU4rxNx57psjqeCg",
    authDomain: "challengeme-d7524.firebaseapp.com",
    databaseURL: "https://challengeme-d7524.firebaseio.com",
    projectId: "challengeme-d7524",
    storageBucket: "challengeme-d7524.appspot.com",
    messagingSenderId: "33728363229",
    appId: "1:33728363229:web:c80d7e09269405519ef934"
});

const messaging = firebase.messaging();