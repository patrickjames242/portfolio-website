import { BrowserRouter } from "react-router-dom";
import HomeSection from "./children/HomeSection/HomeSection";
import NavDrawer from "./children/NavViews/NavDrawer/NavDrawer";
import "helpers/prototypeExtensions";
import { AppContext, AppContextValue } from "./helpers";
import { useMemo, useState } from "react";
import styles from "./App.module.scss";
import NavBarHorizontal from "./children/NavViews/NavBarHorizontal/NavBarHorizontal";

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
				<NavDrawer>
					<div className={styles.App}>
						<NavBarHorizontal className={styles.NavBarHorizontal} />
						<div className={styles.content}>
							<HomeSection />
							<div style={{ height: "5000px" }}></div>
						</div>
					</div>
				</NavDrawer>
			</AppContext.Provider>
		</BrowserRouter>
	);
}

export default App;
