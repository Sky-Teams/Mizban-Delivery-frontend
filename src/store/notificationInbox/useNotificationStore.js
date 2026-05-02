import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  notifications: [],
  loading: false,
  error: false,

  setNotifications: (notifs) => {
    set({ notifications: notifs });
  },

  addNotification: (notif) => {
    set((state) => {
      const exists = state.notifications.some((n) => n.id === notif.id);
      if (exists) return state;

      return {
        notifications: [notif, ...state.notifications],
      };
    });
  },
}));
