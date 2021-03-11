<!-- The core Firebase JS SDK is always required and must be listed first -->
importScripts("https://www.gstatic.com/firebasejs/8.2.6/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.6/firebase-messaging.js");


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


// Wenn sich der Browser im Hintergrund befindet, dann:
messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'test: firebase service worker';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});
