import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import RouteGuard from './RouteGuard';
import routeConfig from './routeConfig';

function buildRouteElement(route) {
  if (route.redirectTo) {
    return <Navigate to={route.redirectTo} replace={route.replace ?? true} />;
  }

  if (!route.Component) {
    return undefined;
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
  const mappedRoute = {
    ...rest,
    element: buildRouteElement(route),
  };

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
