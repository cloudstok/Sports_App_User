
// import deviceModel from '@/models/device.model';
import { Expo } from 'expo-server-sdk';

const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

export async function sendNotification(notificationId: number, title: string, body: string, cropId: number, state: string, key: string = null) {
  const messages = [];
  const pushTokens = []
  //(await DB.Device.findAll({ where: { subscribed: 1, cropId: cropId, state: state }, raw: true })).map(e => e.deviceId);

  for (const pushToken of pushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    messages.push({
      to: pushToken,
      sound: 'default',
      title,
      body,
    });
  }
  const chunks = expo.chunkPushNotifications(messages);
  await Promise.all(
    chunks.map(async chunk => {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }),
  );
  if (key === 'advisory') {
    return;
  }
  console.log('notifications ', notificationId, cropId);
  //   DB.NotificationsData.create({ notificationId });
}





// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCm9n8dx30ttkbyGCCfmI-p6cZEzHWq72k",
//   authDomain: "sport-app-8048e.firebaseapp.com",
//   projectId: "sport-app-8048e",
//   storageBucket: "sport-app-8048e.appspot.com",
//   messagingSenderId: "495283242230",
//   appId: "1:495283242230:web:3c348ce142c291b9afd8d7",
//   measurementId: "G-MHRFVTHKC7"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);