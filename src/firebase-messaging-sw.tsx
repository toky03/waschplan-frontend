<!-- The core Firebase JS SDK is always required and must be listed first -->
importScripts("https://www.gstatic.com/firebasejs/8.2.5/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.5/firebase-analytics.js");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDl1csmPgD6V1KlncMpr5yzClkUwbwbysM",
    authDomain: "waschplan-d17fc.firebaseapp.com",
    projectId: "waschplan-d17fc",
    storageBucket: "waschplan-d17fc.appspot.com",
    messagingSenderId: "837328286802",
    appId: "1:837328286802:web:d721b17f7280ce4decdb8b",
    measurementId: "G-T6TJ20Q94B"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
    return clients
        .matchAll({
            type: "window",
            includeUncontrolled: true,
        })
        .then((windowClients) => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return registration.showNotification("my notification title");
        });
});
self.addEventListener("notificationclick", function(event) {
    console.log(event);
});


firebase.analytics();