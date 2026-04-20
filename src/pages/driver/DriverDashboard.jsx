import { useEffect, useState } from "react";
import { socket } from "../../notificationSystem/socket"; 
import NotificationBox from "../../components/notificationSystem/NotificationBox";

export default function DriverDashboard() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleNewOrder = (data) => {
      console.log("New order received:", data);
      setNotifications(prev => [
        { id: data.orderId, message: `New order created!` },
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