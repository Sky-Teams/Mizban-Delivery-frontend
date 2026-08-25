import { create } from 'zustand';
import {
  getDriverOffers,
  getOfferById,
  rejectOffer,
  acceptOffer,
} from '../../services/driverOfferServices';

export const useOfferStore = create((set) => ({
  loading: false,
  errors: [],
  offerDetails: {},
  allOffers: [],
  isOfferAccepted: false,

  setError: (error) => {
    set({ errors: [error] });
  },

  clearErrors: () => {
    set({ errors: [] });
  },

  setOfferDetails: (details) => {
    set({ offerDetails: details });
  },

  fetchOffers: async ({ page = 1, limit = 20 } = {}) => {
    try {
      set({
        loading: true,
        errors: [],
      });

      const response = await getDriverOffers({
        page,
        limit,
      });

      set({
        allOffers: response?.data ?? [],
      });

      return {
        success: true,
        data: response?.data ?? [],
        pagination: response?.pagination ?? {},
      };
    } catch (error) {
      set({
        errors: [error],
      });

      console.log('Failed to get offers:', error?.message);

      return {
        success: false,
        error,
      };
    } finally {
      set({
        loading: false,
      });
    }
  },

  fetchOfferById: async (offerId) => {
    try {
      set({
        loading: true,
        errors: [],
      });

      const response = await getOfferById(offerId);
      set({
        offerDetails: response?.data ?? null,
      });

      return {
        success: true,
        data: response?.data,
      };
    } catch (error) {
      setError(error);
      console.log('Failed to get offer by id:', error?.message);
      return {
        success: false,
        error: error,
      };
    } finally {
      set({
        loading: false,
      });
    }
  },

  acceptOfferById: async (offerId) => {
    try {
      set({
        loading: true,
        errors: [],
      });
      const response = await acceptOffer(offerId);
      set({ isOfferAccepted: true });

      set((state) => ({
        isOfferAccepted: false,
        offerDetails: {
          ...state.offerDetails,
          ...(response?.data ?? {}),
          status: response?.data?.status ?? 'rejected',
        },
      }));

      return {
        success: true,
        data: response?.data,
      };
    } catch (error) {
      setError(error);
      console.log('Accepting offer faced error :', error.message);
      return {
        success: false,
        error: error,
      };
    } finally {
      set({
        loading: false,
      });
    }
  },

  rejectOfferById: async (offerId) => {
    try {
      set({
        loading: true,
        errors: [],
      });
      const response = await rejectOffer(offerId);
      set({ isOfferAccepted: false });

      set((state) => ({
        isOfferAccepted: false,
        offerDetails: {
          ...state.offerDetails,
          ...(response?.data ?? {}),
          status: response?.data?.status ?? 'rejected',
        },
      }));

      return {
        success: true,
        data: response?.data,
      };
    } catch (error) {
      setError(error);
      console.log('Rejecting offer faced error :', error?.message);
      return {
        success: false,
        error: error,
      };
    } finally {
      set({
        loading: false,
      });
    }
  },
}));
