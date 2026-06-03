export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) return;

  const existing = await navigator.serviceWorker.getRegistration('/firebase-messaging-sw.js');

  if (existing) {
    console.log('service worker already exists:', existing);
    return existing;
  }

  const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

  console.log('service worker registered:', registration);
  return registration;
};
