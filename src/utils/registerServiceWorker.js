export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) return;

  const existing = await navigator.serviceWorker.getRegistration('/firebase-messaging-sw.js');

  const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

  return registration;
};
