import { socket } from '../../config/socket';
import { useNotificationStore } from '../../store/notificationInbox/useNotificationStore';
import i18n from '../../i18n';

export const notificationListener = () => {
  socket.off('notification'); // to prevent duplicates
  socket.off('offer');

  socket.on('notification', (data) => {
    useNotificationStore.getState().addNotification({
      id: data.orderId ?? Date.now(),
      message: data?.message || i18n.t('NEW_EVENT_ARRIVED'),
    });
  });

  socket.on('offer', (data) => {
    const offer = Array.isArray(data) ? data[0] : data;

    useNotificationStore.getState().addOffer({
      id: offer?.offerId ?? Date.now(),
      type: offer?.type,
      title: offer?.title,
      message: offer?.message,
    });
  });
};
