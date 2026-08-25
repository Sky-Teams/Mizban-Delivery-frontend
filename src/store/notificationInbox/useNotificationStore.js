import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  notifications: [],
  offers: [],
  loading: false,
  error: false,

  setNotifications: (notifs) => {
    set({ notifications: notifs });
  },

  addNotification: (notif) => {
    try {
      set((state) => {
        const exists = state.notifications.some((n) => n.id === notif.id);
        if (exists) return state;

        return {
          notifications: [notif, ...state.notifications],
        };
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  setOffers: (offer) => {
    set({ offers: offer });
  },

  addOffer: (offer) => {
    try {
      set((state) => {
        const exists = state.offers.some((item) => item.id === offer.id);

        if (exists) return state;

        return {
          offers: [offer, ...state.offers],
        };
      });
    } catch (error) {
      console.log(error.message);
    }
  },
}));
