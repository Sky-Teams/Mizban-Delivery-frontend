importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCG_bRFXu4h07tupjcg-FjBeDE8lDXGQbg',
  authDomain: 'delivery-system-ae552.firebaseapp.com',
  projectId: 'delivery-system-ae552',
  storageBucket: 'delivery-system-ae552.firebasestorage.app',
  messagingSenderId: '673551112755',
  appId: '1:673551112755:web:5e0a369f970138283a2146',
  measurementId: 'G-DWCY6GYHDT',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('from background', payload);

  const title = payload.notification?.title || 'New Notification';
  const options = {
    body: payload.notification?.body || 'You have a new message',
    icon: '/logo192.png',
    badge: '/logo192.png',
    vibrate: [200, 100, 200],
    requireInteraction: true,
  };

  self.registration.showNotification(title, {
    options,
  });
});
