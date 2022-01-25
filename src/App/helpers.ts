import React from "react";
import { RouteType } from "./children/NavViews/helpers";

export interface MainScreenContextValue {
	menuDrawerIsOpened: boolean;
	setMenuDrawerOpened(shouldBeOpened: boolean): void;
	animateToRouteType(routeType: RouteType): void;
}

export const MainScreenContext = React.createContext<MainScreenContextValue>({
	setMenuDrawerOpened: () => {},
	menuDrawerIsOpened: false,
	animateToRouteType: () => {},
});
