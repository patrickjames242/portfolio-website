import { BrowserRouter } from "react-router-dom";
import styles from "./App.module.scss";
import HomeScreen from "./children/HomeScreen/HomeScreen";
import NavDrawer from "./children/NavViews/NavDrawer/NavDrawer";
import "helpers/prototypeExtensions";
import { AppContext, AppContextValue } from "./helpers";
import { useMemo, useState } from "react";

function App() {
	const [shouldDrawerBeOpen, setShouldDrawerBeOpen] = useState(false);

	const contextValue: AppContextValue = useMemo(
		() => ({
			menuDrawerIsOpened: shouldDrawerBeOpen,
			setMenuDrawerOpened: setShouldDrawerBeOpen,
		}),
		[shouldDrawerBeOpen]
	);

	return (
		<BrowserRouter>
			<AppContext.Provider value={contextValue}>
				<NavDrawer shouldBeOpen={shouldDrawerBeOpen}>
					<div className={styles.App}>
						<HomeScreen />
					</div>
					<div style={{ marginTop: 500 }}></div>
				</NavDrawer>
			</AppContext.Provider>
		</BrowserRouter>
	);
}

export default App;
