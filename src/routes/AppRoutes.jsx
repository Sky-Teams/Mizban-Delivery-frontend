import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RouteGuard from './RouteGuard';
import routeConfig from './routeConfig';

function MissingRouteComponent() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-2 text-2xl font-bold text-gray-800">{t('MISSING_ROUTE_TITLE')}</h1>
      <p className="max-w-md text-gray-600">
        {t('MISSING_ROUTE_MESSAGE')}
      </p>
    </div>
  );
}

function buildRouteElement(route) {
  if (route.redirectTo) {
    return <Navigate to={route.redirectTo} replace={route.replace ?? true} />;
  }

  if (!route.Component) {
    if (route.children?.length) {
      return null;
    }

    return <MissingRouteComponent />;
  }

  const RouteComponent = route.Component;

  return (
    <RouteGuard
      requireAuth={route.requireAuth}
      guestOnly={route.guestOnly}
      requiredPermission={route.requiredPermission}
    >
      <RouteComponent />
    </RouteGuard>
  );
}

function mapRoute(route) {
  const { Component, ErrorBoundary, children, ...rest } = route;
  const element = buildRouteElement(route);
  const mappedRoute = {
    ...rest,
  };

  if (element) {
    mappedRoute.element = element;
  }

  if (ErrorBoundary) {
    mappedRoute.errorElement = <ErrorBoundary />;
  }

  if (!children) {
    return mappedRoute;
  }

  return {
    ...mappedRoute,
    children: children.map(mapRoute),
  };
}

const router = createBrowserRouter(routeConfig.map(mapRoute));

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}