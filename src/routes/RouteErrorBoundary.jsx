import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';

export default function RouteErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  const title = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'Something went wrong';
  const message = isRouteErrorResponse(error)
    ? error.data?.message || 'The page could not be loaded.'
    : error instanceof Error
      ? error.message
      : 'An unexpected error occurred while rendering this page.';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <div className="max-w-lg rounded-2xl border border-red-100 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <p className="mt-3 text-sm text-gray-600">{message}</p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-6 rounded-lg bg-orange-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
        >
          Go back
        </button>
      </div>
    </div>
  );
}
