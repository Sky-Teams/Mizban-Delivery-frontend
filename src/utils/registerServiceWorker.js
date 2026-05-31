export const registerServiceWorker = async () => {
    if (!("serviceWorker" in navigator)) return;

    try {
        const registration = await navigator.serviceWorker.register(
            "/firebase-messaging-sw.js"
        );

        console.log("service worker registered", registration);
    } catch (error) {
        console.error("service worker registration failed:", error);
    }
};