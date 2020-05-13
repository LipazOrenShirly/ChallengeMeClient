import React from 'react';
import { askForPermissioToReceiveNotifications } from './push-notification';




const NotificationButton = () => (
    <button onClick={xxx} >
      Click to receive notifications
    </button>
);

export default NotificationButton;

const xxx=()=>{
  var x= {
    "notification": {
        "title": "Firebase",
        "body": "Firebase is awesome",
        "click_action": "https://challengeme.netlify.app/",
        "icon": "http://url-to-an-icon/icon.png"
    },
    "to": 'eXB9wiRp8pVxhs1WGf4Y12:APA91bGgnS1sL54RXEfZnTHNKSElCWFn7PNCOnYPWeyFT_ysH6zfRTEmG_YGEb5X8ldMAoINyM5xDqC7kRCUipWxuqvh_BUVjKNfQzuHNQMdhGdmzWG_f14qvI7uHhavdLQpE8pgc6b0'
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
  