import { socket } from "../socket";
import { useNotificationStore } from "../../store/notificationInbox/useNotificationStore";
import i18next from "i18next";

export const notificationListener = () => {
    socket.off("notification") // to prevent duplicates
    socket.on("notification", (data) => {
        useNotificationStore.getState().addNotification({
            id: data.orderId ?? Date.now(),
            message: data.message || i18next.t("NEW_NOTIFICATION")
        })
    })
}