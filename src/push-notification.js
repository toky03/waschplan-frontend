import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const initializeFirebase = () => {
    firebase.initializeApp({
        apiKey: "AIzaSyDl1csmPgD6V1KlncMpr5yzClkUwbwbysM",
        authDomain: "waschplan-d17fc.firebaseapp.com",
        projectId: "waschplan-d17fc",
        storageBucket: "waschplan-d17fc.appspot.com",
        messagingSenderId: "837328286802",
        appId: "1:837328286802:web:d721b17f7280ce4decdb8b",
        measurementId: "G-T6TJ20Q94B"
    });

    // use other service worker
    navigator.serviceWorker
       .register('/service-worker.ts')
      .then((registration) => {
          firebase.messaging.usePublicVapidKey("BA_w2LVGWbNWrU4POFGueoDmBNyyTZQKFCk7ZyKuRO7wQNgMX7_PINbtyRMwcuB40NqRoRCC3JKbNgi-fV84Myc");
       });

}

export const askForPermissioToReceiveNotifications = async () => {
    try {

        const messaging = firebase.messaging();

        await Notification.requestPermission();
        const token = await messaging.getToken();
        console.log('user token: ', token);

        return token;
    } catch (error) {
        console.error(error);
    }
}
