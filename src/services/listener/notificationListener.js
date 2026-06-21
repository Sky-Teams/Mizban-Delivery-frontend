import { socket } from '../../config/socket';
import { useNotificationStore } from '../../store/notificationInbox/useNotificationStore';
import i18n from '../../i18n';
import toast from 'react-hot-toast';

export const notificationListener = () => {
  socket.off('notification'); // to prevent duplicates
  socket.on('notification', (data) => {
    useNotificationStore.getState().addNotification({
      id: data.orderId ?? Date.now(),
      message: data?.message || t("NEW_EVENT_ARRIVED"),
    });
  });
};
