importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCG_bRFXu4h07tupjcg-FjBeDE8lDXGQbg",
  authDomain: "delivery-system-ae552.firebaseapp.com",
  projectId: "delivery-system-ae552",
  storageBucket: "delivery-system-ae552.firebasestorage.app",
  messagingSenderId: "673551112755",
  appId: "1:673551112755:web:5e0a369f970138283a2146",
  measurementId: "G-DWCY6GYHDT",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Message received', payload);

  const title = 'New Message';
  const body = {
    body: 'You have a new message',
  };

  self.registration.showNotification(title, body);
});
