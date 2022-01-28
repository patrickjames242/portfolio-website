import { MainScreenContext } from "App/MainScreen/helpers";
import { BubbleTextButton } from "helper-views/BubbleTextButton/BubbleTextButton";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appRoutes, RouteType, useRouteTypeForCurrentRoute } from "../helpers";
import MenuSVG from "../MenuSVG";
import NavLink from "../NavLink/NavLink";
import BracketsSVG from "./brackets-icon";
import styles from "./NavBarHorizontal.module.scss";

export interface NavBarHorizontalProps
	extends React.HTMLAttributes<HTMLDivElement> {}

const calculateShouldContractNavBar = () => window.scrollY > 5;

function NavBarHorizontal({ ...reactProps }: NavBarHorizontalProps) {
	const mainScreenContext = useContext(MainScreenContext);
	const navigate = useNavigate();
	const currentRouteType = useRouteTypeForCurrentRoute();

	const [shouldContractNavBar, setShouldContractNavBar] = useState(
		calculateShouldContractNavBar()
	);

	useEffect(() => {
		const listener = () => {
			setShouldContractNavBar(calculateShouldContractNavBar);
		};
		listener();
		window.addEventListener("scroll", listener);
		return () => {
			window.removeEventListener("scroll", listener);
		};
	}, []);

	return (
		<div
			{...reactProps}
			className={[
				styles.NavBar,
				reactProps.className,
				shouldContractNavBar ? styles.contracted : undefined,
			].asClassString()}
		>
			<a
				className={[styles.nameBox].asClassString()}
				href="/"
				onClick={(event) => {
					event.preventDefault();
					if (currentRouteType === RouteType.home) {
						mainScreenContext?.animateToRouteType(RouteType.home);
					} else {
						navigate("/");
					}
				}}
			>
				<BracketsSVG />
				<div className={[styles.nameText].asClassString()}>
					<span className={styles.firstName}>Patrick</span>{" "}
					<span className={styles.lastName}>Hanna</span>
				</div>
			</a>
			<div className={styles.rightSide}>
				{appRoutes.map(({ routeType, name }, i) => (
					<NavLink key={name} routeType={routeType} />
				))}
				<BubbleTextButton className={styles.resumeButton} title="Resume" />
				<button
					className={[styles.menuButton].asClassString()}
					onClick={() =>
						mainScreenContext.setMenuDrawerOpened(
							!mainScreenContext.menuDrawerIsOpened
						)
					}
				>
					<MenuSVG />
				</button>
			</div>
		</div>
	);
}

export default NavBarHorizontal;
