import {
	RouteType,
	useRouteTypeForCurrentRoute,
} from "App/children/NavViews/helpers";
import { MainScreenContext, MainScreenContextValue } from "App/helpers";
import "helpers/prototypeExtensions";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import AboutMeSection from "../children/AboutMeSection/AboutMeSection";
import ContactMeSection from "../children/ContactMeSection/ContactMeSection";
import HomeSection from "../children/HomeSection/HomeSection";
import NavBarHorizontal from "../children/NavViews/NavBarHorizontal/NavBarHorizontal";
import NavDrawer from "../children/NavViews/NavDrawer/NavDrawer";
import ProjectsSection from "../children/ProjectsSection/ProjectsSection";
import {
	getWindowScrollValueForSection,
	useReactSpringWindowScroller,
} from "./helpers";
import styles from "./MainScreen.module.scss";

export default function MainScreen() {
	const [shouldDrawerBeOpen, setShouldDrawerBeOpen] = useState(false);

	const sectionRefs = {
		aboutMe: useRef<HTMLDivElement>(null),
		projects: useRef<HTMLDivElement>(null),
		contactMe: useRef<HTMLDivElement>(null),
	};

	const currentRouteType = useRouteTypeForCurrentRoute();

	const { scrollScreenToYValue } = useReactSpringWindowScroller();

	const animateToRouteType = useCallback(
		(routeType: RouteType | null) => {
			const yPositionToScrollTo = (() => {
				function refForRouteType(routeType: RouteType | null) {
					switch (routeType) {
						case RouteType.aboutMe:
							return sectionRefs.aboutMe;
						case RouteType.projects:
							return sectionRefs.projects;
						case RouteType.contactMe:
							return sectionRefs.contactMe;
						default:
							return null;
					}
				}
				const ref = refForRouteType(routeType);
				if (ref) return getWindowScrollValueForSection(ref.current!);
				else return 0;
			})();
			if (window.scrollY === yPositionToScrollTo) return;
			scrollScreenToYValue(yPositionToScrollTo);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[scrollScreenToYValue]
	);

	useLayoutEffect(() => {
		animateToRouteType(currentRouteType);
	}, [animateToRouteType, currentRouteType]);

	const contextValue: MainScreenContextValue = useMemo(
		() => ({
			menuDrawerIsOpened: shouldDrawerBeOpen,
			setMenuDrawerOpened: setShouldDrawerBeOpen,
			animateToRouteType: animateToRouteType,
		}),
		[animateToRouteType, shouldDrawerBeOpen]
	);

	return (
		<MainScreenContext.Provider value={contextValue}>
			<NavDrawer>
				<div className={styles.MainScreen}>
					<NavBarHorizontal className={styles.NavBarHorizontal} />
					<div className={styles.content}>
						<HomeSection className={styles.HomeScreen} />
						<AboutMeSection ref={sectionRefs.aboutMe} />
						<ProjectsSection ref={sectionRefs.projects} />
						<ContactMeSection ref={sectionRefs.contactMe} />
					</div>
				</div>
			</NavDrawer>
		</MainScreenContext.Provider>
	);
}
