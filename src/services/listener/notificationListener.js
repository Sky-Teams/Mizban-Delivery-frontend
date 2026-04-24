import toast from "react-hot-toast";
import { socket } from "../../config/socket";
import { useNotificationStore } from "../../store/notificationInbox/useNotificationStore";
import i18n from "../../i18n";
export const notificationListener = async () => {
    socket.off("notification") // to prevent duplicates
    socket.on("notification", (data) => {
        useNotificationStore.getState().addNotification({
            id: data.orderId ?? Date.now(),
            message: data.message || i18n.t("NEW_NOTIFICATION")
        })
        toast.success("New order created")
    })
}