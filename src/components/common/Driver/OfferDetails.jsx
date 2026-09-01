import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../order/Button';
import { useOfferStore } from '../../../store/driver/useOfferStore';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { LuArrowLeft } from 'react-icons/lu';

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
    const toastId = toast.loading(t('LOADING'));
    try {
      await acceptOfferById(id);
      toast.success(t('OFFER_ACCEPTED_SUCCESS'));
      navigate(-1)
    } catch (error) {
      console.log(error.message);

      toast.error('FAILED_TO_ACCEPT_OFFER');
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleRejectOffer = async () => {
    const toastId = toast.loading(t('LOADING'));
    try {
      await rejectOfferById(id);

      toast.success(t('OFFER_REJECTED_SUCCESS'));
      navigate(-1)
    } catch (error) {
      toast.error(t('FAILED_TO_REJECT_OFFER'));
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
          {t('GO_BACK')}
        </button>
      </div>
    );
  }

  const order = offer.order;

  const pickupCoordinates = order?.pickupLocation?.coordinates || [];
  const dropoffCoordinates = order?.dropoffLocation?.coordinates || [];

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-5 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <LuArrowLeft size={20} />
          {t('BACK')}
        </button>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  {t('DELIVERY_OFFER')}
                </p>

                <h1 className="mt-1 text-xl font-bold text-gray-900">Offer #{offer._id}</h1>

                {order?._id && <p className="mt-1 text-xs text-gray-400">Order #{order._id}</p>}
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  offer.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : offer.status === 'accepted'
                      ? 'bg-green-100 text-green-700'
                      : offer.status === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : offer.status === 'expired'
                          ? 'bg-gray-200 text-gray-600'
                          : 'bg-gray-100 text-gray-500'
                }`}
              >
                {offer.status}
              </span>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800">{t('DELIVERY_DETAILS')}</h2>

            <div className="mt-5 flex gap-4">
              <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-green-500" />

              <div>
                <p className="text-xs font-medium text-gray-400">{t('PICKUP')}</p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {pickupCoordinates.length > 0
                    ? pickupCoordinates.join(', ')
                    : 'Pickup location unavailable'}
                </p>
              </div>
            </div>

            <div className="ml-1.5 h-6 border-l border-dashed border-gray-300" />

            <div className="flex gap-4">
              <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-red-500" />

              <div>
                <p className="text-xs font-medium text-gray-400">{t('DROP_OFF')}</p>

                <p className="mt-1 text-sm font-medium text-gray-800">
                  {dropoffCoordinates.length > 0
                    ? dropoffCoordinates.join(', ')
                    : 'Drop-off location unavailable'}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 border-t border-gray-100 pt-5 md:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  {t('SENDER')}
                </p>

                <p className="mt-2 font-semibold text-gray-800">{order?.sender?.name || '-'}</p>

                <p className="mt-1 text-sm text-gray-500">{order?.sender?.phone || '-'}</p>
              </div>

              {/* Receiver */}
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  {t('RECEIVER')}
                </p>

                <p className="mt-2 font-semibold text-gray-800">{order?.receiver?.name || '-'}</p>

                <p className="mt-1 text-sm text-gray-500">{order?.receiver?.phone || '-'}</p>

                {order?.receiver?.address && (
                  <p className="mt-1 text-sm text-gray-500">{order.receiver.address}</p>
                )}
              </div>
            </div>

            {order?.packageDetails && (
              <div className="mt-5 border-t border-gray-100 pt-5">
                <h3 className="text-sm font-semibold text-gray-700">{'PACKAGE_DETAILS'}</h3>

                <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-400">{t('WEIGHT')}</p>

                    <p className="mt-1 text-sm font-semibold text-gray-700">
                      {order.packageDetails.weight ?? '-'} kg
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-400">{t('SIZE')}</p>

                    <p className="mt-1 text-sm font-semibold text-gray-700">
                      {order.packageDetails.size ?? '-'}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-400">{t('FRAGILE')}</p>

                    <p className="mt-1 text-sm font-semibold text-gray-700">
                      {order.packageDetails.fragile ? t('YES') : t('NO')}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-400">{t('NOTES')}</p>

                    <p className="mt-1 text-sm font-semibold text-gray-700">
                      {order.packageDetails.note || '-'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Items */}
            {order?.items?.length > 0 && (
              <div className="mt-5 border-t border-gray-100 pt-5">
                <h3 className="text-sm font-semibold text-gray-700">Items</h3>

                <div className="mt-3 space-y-2">
                  {order.items.map((item, index) => (
                    <div
                      key={item._id || index}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {item.name || `Item ${index + 1}`}
                        </p>

                        {item.quantity && (
                          <p className="text-xs text-gray-400">Quantity: {item.quantity}</p>
                        )}
                      </div>

                      {item.price != null && (
                        <p className="text-sm font-semibold text-gray-700">{item.price} AFN</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment and pricing */}
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-gray-400">{t('ORDER_AMOUNT')}</p>

                <p className="mt-1 font-semibold text-gray-800">
                  {order?.amountToCollect ?? '-'} AFN
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-gray-400">{t('DELIVERY_FEE')}</p>

                <p className="mt-1 font-semibold text-gray-800">
                  {order?.deliveryPrice ?? '-'} AFN
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-lg bg-orange-50 p-4">
              <span className="text-sm font-medium text-gray-600">{t('TOTAL')}</span>

              <span className="text-lg font-bold text-orange-600">
                {order?.finalPrice ?? '-'} AFN
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-lg border border-gray-100 p-4">
              <span className="text-sm text-gray-500">{t('PAYMENT_TYPE')}</span>

              <span className="text-sm font-semibold text-gray-700">
                {order?.paymentType || '-'}
              </span>
            </div>

            <div className="mt-5 space-y-1 text-xs text-gray-400">
              <p>
                Offered at: {offer.offeredAt ? new Date(offer.offeredAt).toLocaleString() : '-'}
              </p>

              <p>
                Expires at: {offer.expiredAt ? new Date(offer.expiredAt).toLocaleString() : '-'}
              </p>

              {offer.respondedAt && (
                <p>Responded at: {new Date(offer.respondedAt).toLocaleString()}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          {offer.status === 'pending' && (
            <div className="flex gap-3 border-t border-gray-200 bg-gray-50 p-6">
              <Button
                className="flex-1 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                onClick={handleAcceptOffer}
                text={t('ACCEPT_OFFER')}
              />

              <Button
                className="flex-1 rounded-lg border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                onClick={handleRejectOffer}
                variant="secondary"
                text={t('REJECT_OFFER')}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
