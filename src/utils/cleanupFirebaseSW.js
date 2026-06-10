// function is used to clean all the sw services, basically those that their scope or script url matches the irebase messaging
export const cleanupFirebaseSW = async () => {
  const regs = await navigator.serviceWorker.getRegistrations();

  await Promise.all(
    regs
      .filter((r) =>
        r.scope.includes('firebase') ||
        r.scriptURL?.includes('firebase-messaging-sw.js')
      )
      .map((r) => r.unregister())
  );
};