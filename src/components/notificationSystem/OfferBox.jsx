import { useTranslation } from 'react-i18next';
import { useNotificationStore } from '../../store/notificationInbox/useNotificationStore';
import { useNavigate } from 'react-router-dom';

export default function OfferBox() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const offers = useNotificationStore((state) => state.offers);

  const offerCount = offers.length;

  const handleOpenOffer = (offerId) => {
    navigate(`/notifications/offers/${offerId}`);
  };

  const handleFetchAllOffers = () => {
    navigate(`/notifications/offers/all-offers`);
  };

  const offerAccepted = 'bg-green-100 text-green-700';
  const offerRejected = 'bg-red-100 text-red-700';

  return (
    <div className="space-y-3 overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-700">{t('DELIVERY_OFFERS')}</h2>

          <p className="mt-1 text-sm text-slate-500">{t('WAITING_OFFERS')}</p>
        </div>
        <div>
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
            {offerCount} {offerCount === 1 ? t('OFFER') : t('OFFERS')}
          </span>
          <button
            className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600 mx-2 hover:cursor-pointer"
            onClick={handleFetchAllOffers}
          >
            {t('ALL_OFFERS')}
          </button>
        </div>
      </div>
      <hr className="my-5 border-0 border-t border-gray-200" />
      {offerCount > 0 ? (
        <div>
          {/* offers */}
          <div className="mt-4 space-y-3">
            {offers.map((offer) => (
              <div
                onClick={() => handleOpenOffer(offer.id)}
                key={offer.id}
                className="rounded-lg border border-gray-200 bg-gray-50 p-3 transition-all duration-100 ease-in-out hover:cursor-pointer hover:bg-gray-100"
              >
                <p className="text-sm text-gray-700">{offer.message}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-6 text-center">
          <h2 className="text-lg font-semibold text-slate-700">{t('NO_OFFERS')}</h2>

          <p className="mt-1 text-sm text-slate-400">{t('OFFERS_DESC_PAGE')}</p>
        </div>
      )}
    </div>
  );
}
