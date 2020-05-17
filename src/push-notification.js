import firebase from 'firebase';
import { store } from 'react-notifications-component';
import React, { Component } from 'react';
import { Notification } from './Component/LittleComponents/Notification';

export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyA-3U2Iz3Uck2ayvI7VU4rxNx57psjqeCg",
    authDomain: "challengeme-d7524.firebaseapp.com",
    databaseURL: "https://challengeme-d7524.firebaseio.com",
    projectId: "challengeme-d7524",
    storageBucket: "challengeme-d7524.appspot.com",
    messagingSenderId: "33728363229",
    appId: "1:33728363229:web:c80d7e09269405519ef934"
  });
}

export const askForPermissioToReceiveNotifications = async () => {

  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('user token:', token);

    return token;
  }

  catch (error) {
    console.error(error);
  }
}

// גם אם הבנאדם מחובר לאפליקציה יקבל אלרט
export const waitForMassege = async () => {
  var title, body = await "";
  const messaging = await firebase.messaging();
  await messaging.onMessage(payload => {
    console.log("Message received. ", payload);
    title = payload.notification.title;
    body = payload.notification.body;
    
    // store.addNotification({
    //   title: title,
    //   message: body,
    //   type: "success",
    //   insert: "top",
    //   container: "top-center",
    //   animationIn: ["animated", "fadeIn"],
    //   animationOut: ["animated", "fadeOut"],
    //   dismiss: {
    //     duration: 3000,
    //   }
    // });
    
    Notification(title, body);
  });
}
