export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) return;

  const regs = await navigator.serviceWorker.getRegistrations();
  const firebaseRegs = regs.filter( // keeps the one we have
    (r) => r.scope.includes('firebase-messaging') ||
      r.scriptURL?.includes('firebase-messaging-sw.js')
  );

  if (firebaseRegs.length > 1) { // removing the one that is duplicated
    await Promise.all(firebaseRegs.map((r) => r.unregister()));
  }

  const existing = regs.find((r) => // one to exist
    r.scriptURL?.includes('firebase-messaging-sw.js')
  );

  if (existing) return existing;

  return navigator.serviceWorker.register('/firebase-messaging-sw.js');
};