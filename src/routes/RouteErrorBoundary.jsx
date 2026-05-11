import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse, Link, useNavigate, useRouteError } from 'react-router-dom';

const ROUTE_ERROR_KEYS = {
  401: {
    title: 'route_error_401_title',
    message: 'route_error_401_message',
  },
  403: {
    title: 'route_error_403_title',
    message: 'route_error_403_message',
  },
  404: {
    title: 'route_error_404_title',
    message: 'route_error_404_message',
  },
  500: {
    title: 'route_error_500_title',
    message: 'route_error_500_message',
  },
};

export default function RouteErrorBoundary() {
  const { t } = useTranslation();
  const error = useRouteError();
  const navigate = useNavigate();
  const routeErrorConfig = isRouteErrorResponse(error) ? ROUTE_ERROR_KEYS[error.status] : null;

  const title = isRouteErrorResponse(error)
    ? `${error.status} ${t(routeErrorConfig?.title || 'route_error_default_title')}`
    : t('route_error_default_title');
  const message = isRouteErrorResponse(error)
    ? error.data?.message || t(routeErrorConfig?.message || 'route_error_default_message')
    : error instanceof Error
      ? error.message || t('route_error_render_message')
      : t('route_error_render_message');

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
            {t('go_back')}
          </button>
          <Link
            to="/"
            className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            {t('go_home')}
          </Link>
        </div>
      </div>
    </div>
  );
}
