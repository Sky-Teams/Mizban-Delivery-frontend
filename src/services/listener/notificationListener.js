import { useTranslation } from 'react-i18next';
import { socket } from '../../config/socket';
import { useNotificationStore } from '../../store/notificationInbox/useNotificationStore';

export const notificationListener = () => {
  const { t } = useTranslation();
  socket.off('notification'); // to prevent duplicates
  socket.on('notification', (data) => {
    useNotificationStore.getState().addNotification({
      id: data.orderId ?? Date.now(),
      message: data?.message || t('NEW_EVENT_ARRIVED'),
    });
  });
};
