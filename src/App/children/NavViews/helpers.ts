import { matchPath, useLocation } from "react-router-dom";

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
		path: "/",
		name: "Home",
		routeType: RouteType.home,
	},
	[RouteType.aboutMe]: {
		path: "/about-me",
		name: "About Me",
		routeType: RouteType.aboutMe,
	},
	[RouteType.projects]: {
		path: "/projects",
		name: "Projects",
		routeType: RouteType.projects,
	},
	[RouteType.contactMe]: {
		path: "/contact-me",
		name: "Contact Me",
		routeType: RouteType.contactMe,
	},
};

export const appRoutes: readonly AppRoute[] = Object.freeze(
	[
		RouteType.home,
		RouteType.aboutMe,
		RouteType.projects,
		RouteType.contactMe,
	].map((x) => appRoutesObj[x])
);

export function getInfoForRouteType(routeType: RouteType) {
	return appRoutesObj[routeType];
}

export function getInfoForRoutePath(path: string) {
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
			matchPath({ path: route.path, caseSensitive: false, end: false }, path) !=
			null
		) {
			return route;
		}
	}

	throw new Error("this point should not be reached");
}

export function useRouteTypeForCurrentRoute(): RouteType {
	const location = useLocation();
	return getInfoForRoutePath(location.pathname)!.routeType;
}
