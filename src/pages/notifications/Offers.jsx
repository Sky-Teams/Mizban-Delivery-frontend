import { useEffect } from 'react';
import {
  LuArrowRight,
  LuClock3,
  LuMapPin,
  LuPackage,
  LuArrowLeft
} from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import Pagination from '../../components/common/Pagination';
import { useOfferStore } from '../../store/driver/useOfferStore';
import useOrderPaginationStore from '../../store/orders/useOrderPaginationStore';
import Button from '../../components/common/order/Button';

import { formatDate } from '../../utils/formatDate';
import { useTranslation } from 'react-i18next';

export default function Offers() {
  const navigate = useNavigate();
  const {t} = useTranslation()

  const offers = useOfferStore((state) => state.allOffers);
  const loading = useOfferStore((state) => state.loading);
  const errors = useOfferStore((state) => state.errors);
  const fetchOffers = useOfferStore((state) => state.fetchOffers);
  const currentPage = useOrderPaginationStore((state) => state.currentPage);
  const totalPages = useOrderPaginationStore((state) => state.totalPages);
  const currentLimit = useOrderPaginationStore((state) => state.currentLimit);
  const setTotalPages = useOrderPaginationStore((state) => state.setTotalPages);
  const updateCurrentLimit = useOrderPaginationStore((state) => state.updateCurrentLimit);
  const handleNextButton = useOrderPaginationStore((state) => state.handleNextButton);
  const handlePrevButton = useOrderPaginationStore((state) => state.handlePrevButton);
  const handlePageNumberClick = useOrderPaginationStore((state) => state.handlePageNumberClick);

  useEffect(() => {
    const loadOffers = async () => {
      const response = await fetchOffers({
        page: currentPage,
        limit: currentLimit,
      });

      if (!response?.success) {
        toast.error(t('FAILED_LOAGIN_OFFERS'));
        return;
      }
      setTotalPages(response?.pagination?.totalPages ?? 1);
    };

    loadOffers();
  }, [
    currentPage,
    currentLimit,
    fetchOffers,
    setTotalPages,
  ]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return 'border-yellow-200 bg-yellow-50 text-yellow-700';

      case 'accepted':
        return 'border-green-200 bg-green-50 text-green-700';

      case 'rejected':
        return 'border-red-200 bg-red-50 text-red-700';

      case 'expired':
        return 'border-gray-200 bg-gray-100 text-gray-500';

      default:
        return 'border-gray-200 bg-gray-100 text-gray-600';
    }
  };



  if (loading && offers.length === 0) {
    return (
      <div className="flex min-h-14 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500" />

          <p className="mt-3 text-sm text-gray-500">
            {t('LOADING')}
          </p>
        </div>
      </div>
    );
  }


  if (errors.length > 0 && offers.length === 0) {
    return (
      <div className="flex min-h-14 items-center justify-center p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-medium text-red-600">
            {t('FAILED_LOAGIN_OFFERS')}
          </p>

          <Button
            onClick={() =>
              fetchOffers({
                page: currentPage,
                limit: currentLimit,
              })
            }
            className="mt-4 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
          >
            {t('TRY_AGAIN')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">

        <button
          onClick={() => navigate(-1)}
          className="mb-5 text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center justify-center gap-2"
        >
            <LuArrowLeft size={20} />
            {t('BACK')}  
        </button>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>

            <h1 className="mt-1 text-2xl font-bold text-gray-900">
               {t('YOUR_OFFERS')}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {t('OFFERS_ASSIGNED_TO_YOU')}
            </p>
          </div>

        </div>

        {offers.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <LuPackage
                size={23}
                className="text-gray-400"
              />
            </div>

            <h2 className="mt-4 font-semibold text-gray-800">
              {t('NO_OFFERS')}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
             {t('OFFERS_DESC_PAGE')}
            </p>
          </div>
        ) : (
          <div className="space-y-3">

            {offers.map((offer) => {
              const order = offer?.order;

              return (
                <div
                  key={offer._id}
                  className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-orange-200 hover:shadow-md"
                >
            
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50">
                        <LuPackage
                          size={19}
                          className="text-orange-600"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs text-gray-400">
                          {t('DELIVERY_OFFER')}
                        </p>

                        <p className="truncate text-sm font-semibold text-gray-800">
                          {offer._id}
                        </p>
                      </div>

                    </div>

                    <span
                      className={`w-fit rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                        offer.status,
                      )}`}
                    >
                      {offer.status}
                    </span>

                  </div>

            

                  <div className="mt-4 rounded-lg bg-gray-50 px-3 py-3">

                    <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">

                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                          {t('PICKUP')}
                        </p>

                        <div className="mt-1 flex items-start gap-1.5">
                          <LuMapPin
                            size={14}
                            className="mt-0.5 shrink-0 text-green-600"
                          />

                          <p className="truncate text-sm font-medium text-gray-700">
                            {order?.pickup ||
                              order?.pickupLocation ||
                              'Unavailable'}
                          </p>
                        </div>
                      </div>


                      <div className="hidden sm:block">
                        <LuArrowRight
                          size={18}
                          className="text-gray-300"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                            {t('DROP_OFF')}
                        </p>

                        <div className="mt-1 flex items-start gap-1.5">
                          <LuMapPin
                            size={14}
                            className="mt-0.5 shrink-0 text-red-500"
                          />

                          <p className="truncate text-sm font-medium text-gray-700">
                            {order?.dropoff ||
                              order?.dropoffLocation ||
                              'Unavailable'}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="mt-3 flex flex-col gap-3 border-t border-gray-100 pt-3 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">

                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-gray-400">
                          {t('ORDER')}
                        </p>

                        <p className="text-sm font-semibold text-gray-800">
                          {order?.amount ?? '-'} AFN
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-gray-400">
                          {t('DELIVERY')}
                        </p>

                        <p className="text-sm font-semibold text-gray-800">
                          {order?.deliveryFee ?? '-'} AFN
                        </p>
                      </div>


                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-gray-400">
                          {t('OFFERED')}
                        </p>

                        <div className="flex items-center gap-1">
                          <LuClock3
                            size={13}
                            className="text-gray-400"
                          />

                          <p className="text-sm text-gray-600">
                            {formatDate(offer.offeredAt)}
                          </p>
                        </div>
                      </div>

                    </div>


                    <Button
                      onClick={() =>
                        navigate(
                          `/notifications/offers/${offer._id}`,
                        )
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-lg  sm:w-auto h-auto"
                    >
                        {t('VIEW_DETAILS')}
                      <LuArrowRight size={15} />
                    </Button>

                  </div>
                </div>
              );
            })}
          </div>
        )}
        {totalPages > 0 && (
          <div className="mt-5 rounded-xl border border-gray-200 bg-white shadow-sm">
            <Pagination
              config={{
                currentPage,
                totalPages,
                handleNextButton,
                handlePrevButton,
                handlePageNumberClick,
                updateCurrentLimit,
                isLoading: loading,
                currentLimit,
                dropup: true,
                showRowsSelector: true,
              }}
            />
          </div>
        )}

      </div>
    </div>
  );
}