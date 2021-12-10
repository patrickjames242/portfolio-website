import React from "react";

export interface AppContextValue {
	menuDrawerIsOpened: boolean;
	setMenuDrawerOpened(shouldBeOpened: boolean): void;
}

export const AppContext = React.createContext<AppContextValue>({
	setMenuDrawerOpened: () => {},
	menuDrawerIsOpened: false,
});
