import { MainScreenContext } from 'App/MainScreen/helpers';
import { useContext } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import {
  DocumentViewerCollection,
  documentViewerWebsiteDemo,
} from '../ProjectsSection/DocumentViewer/helpers';

export function resumeDocumentViewerCollection(): DocumentViewerCollection {
  return {
    initialItem: {
      title: 'Patrick Hanna Resume',
      data: documentViewerWebsiteDemo('/resume.pdf'),
      viewerMaxWidth: '900px',
    },
  };
}

export enum RouteType {
  home,
  aboutMe,
  projects,
  contactMe,
}

interface AppRoute {
  path: string;
  name: string;
  routeType: RouteType;
}

const appRoutesObj: Record<RouteType, AppRoute> = {
  [RouteType.home]: {
    path: '/',
    name: 'Home',
    routeType: RouteType.home,
  },
  [RouteType.aboutMe]: {
    path: '/about-me',
    name: 'About Me',
    routeType: RouteType.aboutMe,
  },
  [RouteType.projects]: {
    path: '/projects',
    name: 'Projects',
    routeType: RouteType.projects,
  },
  [RouteType.contactMe]: {
    path: '/contact-me',
    name: 'Contact Me',
    routeType: RouteType.contactMe,
  },
};

export const appRoutes: readonly AppRoute[] = Object.freeze(
  [
    RouteType.home,
    RouteType.aboutMe,
    RouteType.projects,
    RouteType.contactMe,
  ].map((x) => appRoutesObj[x]),
);

export function getInfoForRouteType(routeType: RouteType): AppRoute {
  return appRoutesObj[routeType];
}

export function getInfoForRoutePath(path: string): AppRoute | null {
  // sorts the routes so that home is last
  const routesSorted = [...appRoutes].sort((i1, i2) => {
    if (i2.routeType === RouteType.home) {
      return -1;
    } else if (i1.routeType === RouteType.home) {
      return 1;
    } else return 0;
  });

  for (const route of routesSorted) {
    if (
      matchPath(
        {
          path: route.path,
          caseSensitive: false,
          end: route.routeType === RouteType.home,
        },
        path,
      ) != null
    ) {
      return route;
    }
  }
  return null;
}

export function useRouteTypeForCurrentRoute(): RouteType | null {
  const location = useLocation();
  return getInfoForRoutePath(location.pathname)?.routeType ?? null;
}

export function useRouteTypeNavigation(): (routeType: RouteType) => void {
  const location = useLocation();
  const mainScreenContext = useContext(MainScreenContext);
  const navigate = useNavigate();
  return (routeType: RouteType) => {
    const routeInfo = getInfoForRouteType(routeType);
    if (getInfoForRoutePath(location.pathname)?.routeType === routeType) {
      mainScreenContext.animateToRouteType(routeType);
    } else {
      navigate(routeInfo.path);
    }
  };
}
