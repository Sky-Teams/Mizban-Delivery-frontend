import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { rejectOffer } from '../../../services/driverOfferServices';
import { acceptOffer } from '../../../services/driverOfferServices';
import Button from '../order/Button';
import { useOfferStore } from '../../../store/driver/useOfferStore';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function OfferDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const offer = useOfferStore((state) => state.offerDetails);
  const loading = useOfferStore((state) => state.loading);
  const errors = useOfferStore((state) => state.errors);
  const fetchOfferById = useOfferStore((state) => state.fetchOfferById);
  const acceptOfferById = useOfferStore((state) => state.acceptOfferById);
  const rejectOfferById = useOfferStore((state) => state.rejectOfferById);

  const handleAcceptOffer = async () => {
    const toastId = toast.loading('LOADING');
    try {
      const response = await acceptOfferById(id);

      toast.success('Offer accepted successfully!');
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleRejectOffer = async () => {
    const toastId = toast.loading('LOADING');

    try {
      const response = await rejectOfferById(id);
      toast.success('Offer rejected successfully!');
    } catch (error) {
      toast.error('Offer could not be rejected!');
    } finally {
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    if (id) {
      fetchOfferById(id);
    }
  }, [id, fetchOfferById]);

  if (loading) {
    return (
      <div className="flex min-h-14 items-center justify-center">
        <p className="text-sm text-gray-500">{t('LOADING')}</p>
      </div>
    );
  }

  if (errors.length > 0 || !offer) {
    return (
      <div className="flex min-h-14 flex-col items-center justify-center">
        <p className="text-sm text-red-500">{errors[0]?.message || 'Offer not found'}</p>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
        >
          Go Back
        </button>
      </div>
    );
  }
  const order = offer.order;

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="mx-auto max-w-2xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-5 text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center justify-center gap-2"
        >
          <LuArrowLeft size={20} />
          {t('BACK')}
        </button>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  {t('DELIVERY_OFFER')}
                </p>

                <h1 className="mt-1 text-xl font-bold text-gray-900">Offer #{offer._id}</h1>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  offer.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : offer.status === 'accepted'
                      ? 'bg-green-100 text-green-700'
                      : offer.status === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-500'
                }`}
              >
                {offer.status}
              </span>
            </div>
          </div>

          {/* Order information */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800">{t('DELIVERY_DETAILS')}</h2>

            <div className="mt-5 flex gap-4">
              <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-green-500" />

              <div>
                <p className="text-xs font-medium text-gray-400">{t('PICKUP')}</p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {order?.pickup || 'Pickup location unavailable'}
                </p>
              </div>
            </div>

            <div className="ml-1.5 h-6 border-l border-dashed border-gray-300" />

            <div className="flex gap-4">
              <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-red-500" />

              <div>
                <p className="text-xs font-medium text-gray-400">{t('DROP_OFF')}</p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {order?.dropoff || 'Drop-off location unavailable'}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-gray-400">{t('ORDER_AMOUNT')}</p>

                <p className="mt-1 font-semibold text-gray-800">{order?.amount ?? '-'} AFN</p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-gray-400">{'DELIVERY_FEE'}</p>

                <p className="mt-1 font-semibold text-gray-800">{order?.deliveryFee ?? '-'} AFN</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-lg bg-orange-50 p-4">
              <span className="text-sm font-medium text-gray-600">{t('TOTAL')}</span>

              <span className="text-lg font-bold text-orange-600">{order?.total ?? '-'} AFN</span>
            </div>

            <div className="mt-5 text-xs text-gray-400">
              Offered at: {offer.offeredAt ? new Date(offer.offeredAt).toLocaleString() : '-'}
            </div>
          </div>

          {offer.status === 'pending' && (
            <div className="flex gap-3 border-t border-gray-200 bg-gray-50 p-6">
              <Button
                className="flex-1 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                onClick={handleAcceptOffer}
              >
                {t('ACCEPT_OFFER')}
              </Button>

              <Button
                className="flex-1 rounded-lg border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                onClick={handleRejectOffer}
                variant="secondary"
              >
                {t('REJECT_OFFER')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
