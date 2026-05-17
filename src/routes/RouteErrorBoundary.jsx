import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse, Link, useNavigate, useRouteError } from 'react-router-dom';

const ROUTE_ERROR_KEYS = {
  401: {
    title: 'ROUTE_ERROR_401_TITLE',
    message: 'ROUTE_ERROR_401_MESSAGE',
  },
  403: {
    title: 'ROUTE_ERROR_403_TITLE',
    message: 'ROUTE_ERROR_403_MESSAGE',
  },
  404: {
    title: 'ROUTE_ERROR_404_TITLE',
    message: 'ROUTE_ERROR_404_MESSAGE',
  },
  500: {
    title: 'ROUTE_ERROR_500_TITLE',
    message: 'ROUTE_ERROR_500_MESSAGE',
  },
};

export default function RouteErrorBoundary() {
  const { t } = useTranslation();
  const error = useRouteError();
  const navigate = useNavigate();
  const routeErrorConfig = isRouteErrorResponse(error) ? ROUTE_ERROR_KEYS[error.status] : null;

  const title = isRouteErrorResponse(error)
    ? `${error.status} ${t(routeErrorConfig?.title || 'ROUTE_ERROR_DEFAULT_TITLE')}`
    : t('ROUTE_ERROR_DEFAULT_TITLE');
  const message = isRouteErrorResponse(error)
    ? error.data?.message || t(routeErrorConfig?.message || 'ROUTE_ERROR_DEFAULT_MESSAGE')
    : error instanceof Error
      ? error.message || t('ROUTE_ERROR_RENDER_MESSAGE')
      : t('ROUTE_ERROR_RENDER_MESSAGE');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <div className="max-w-lg rounded-2xl border border-red-100 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <p className="mt-3 text-sm text-gray-600">{message}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg bg-orange-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
          >
            {t('GO_BACK')}
          </button>
          <Link
            to="/"
            className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            {t('GO_HOME')}
          </Link>
        </div>
      </div>
    </div>
  );
}