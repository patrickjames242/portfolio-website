import "helpers/prototypeExtensions";
import { useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import styles from "./App.module.scss";
import HomeSection from "./children/HomeSection/HomeSection";
import NavBarHorizontal from "./children/NavViews/NavBarHorizontal/NavBarHorizontal";
import NavDrawer from "./children/NavViews/NavDrawer/NavDrawer";
import ProjectsSection from "./children/ProjectsSection/ProjectsSection";
import { AppContext, AppContextValue } from "./helpers";

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
							<ProjectsSection style={{ marginTop: 20 }} />
						</div>
					</div>
				</NavDrawer>
			</AppContext.Provider>
		</BrowserRouter>
	);
}

export default App;
