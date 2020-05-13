import firebase from 'firebase';

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
    alert(token);
    xxx(token);
    return token;
  } 
  
  catch (error) {
    console.error(error);
  }
}
const xxx=(token)=>{
var x= {
  "notification": {
      "title": "Firebase",
      "body": "Firebase is awesome",
      "click_action": "https://challengeme.netlify.app/",
      "icon": "http://url-to-an-icon/icon.png"
  },
  "to": token
}
fetch("https://fcm.googleapis.com/fcm/send" , {
  method: 'POST',
  body:JSON.stringify(x),
  headers: new Headers({
      'Content-type': 'application/json; charset=UTF-8' ,
      'Authorization':'key=AAAAB9pd-t0:APA91bFqlbdOGpqVbNifFlo-_2p9uPFoFqqi0iY5O-_bFjMuzYgVlxC7uC9xRQEprfEqdiDjsNEremg7RWBHlyMQhlhC1Hxo_ZPUsjCYTPUS3nu4cMQJ3tXhUImmftNhg3TPjlN1Wq1G'

  })
})
  .then(res => {
      console.log('res=', res);
      if (!res.ok)
          throw new Error('Network response was not ok.');
      return res.json();
  })
  .then(
      (result) => {
          console.log("fetch POST= ", result);
      
      },
      (error) => {
          console.log("err post=", error);
         
      });
    }