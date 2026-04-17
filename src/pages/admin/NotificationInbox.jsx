import { useEffect, useState } from "react";
import { socket } from "../../notificationSystem/socket"; 
import NotificationBox from "../../components/notificationSystem/NotificationBox";
import { useTranslation } from "react-i18next";

export default function NotificationInbox() {
    const [notifications, setNotifications] = useState([]);
    const {t} = useTranslation()

    useEffect(() => {
        const handleNewOrder = (data) => {
            console.log("New order received:", data);
            setNotifications(prev => [
                {
                    id: data.orderId || Date.now(),
                    message: data.message || t("NEW_NOTIFICATION")
                },
                ...prev
            ]);
        };

        socket.on("notification", handleNewOrder);

        return () => {
            socket.off("notification", handleNewOrder);
        };
    }, []);

    return (
        <div>
        <NotificationBox notifications={notifications} />
        </div>
    );
}