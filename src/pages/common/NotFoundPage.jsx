import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold text-gray-900">404</h1>
      <p className="mt-3 text-sm text-gray-600">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-orange-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
      >
        Return home
      </Link>
    </div>
  );
}
