import { onMessage } from 'firebase/messaging';
import { messaging } from '../../config/firebase';
import toast from 'react-hot-toast';

export const firebaseListener = () => {
  onMessage(messaging, (payload) => {
    console.log('from foregroud:', payload);

    toast.success(
      payload.notification?.title || 'New notification', // the exact message is displayed for now, we can have custom translated messages later
    );
  });
};
