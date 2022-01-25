import { MainScreenContext } from "App/helpers";
import BubbleTextButton from "helper-views/BubbleTextButton/BubbleTextButton";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { appRoutes } from "../helpers";
import MenuSVG from "../MenuSVG";
import NavLink from "../NavLink/NavLink";
import BracketsSVG from "./brackets-icon";
import styles from "./NavBarHorizontal.module.scss";

export interface NavBarHorizontalProps
	extends React.HTMLAttributes<HTMLDivElement> {}

const calculateShouldContractNavBar = () => window.scrollY > 5;

function NavBarHorizontal({ ...reactProps }: NavBarHorizontalProps) {
	const appContext = useContext(MainScreenContext);

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
			<Link className={[styles.nameBox].asClassString()} to="/">
				<BracketsSVG />
				<div className={[styles.nameText].asClassString()}>
					<span className={styles.firstName}>Patrick</span>{" "}
					<span className={styles.lastName}>Hanna</span>
				</div>
			</Link>
			<div className={styles.rightSide}>
				{appRoutes.map(({ routeType, name }, i) => (
					<NavLink key={name} routeType={routeType} />
				))}
				<BubbleTextButton className={styles.resumeButton} title="Resume" />
				<button
					className={[styles.menuButton].asClassString()}
					onClick={() =>
						appContext.setMenuDrawerOpened(!appContext.menuDrawerIsOpened)
					}
				>
					<MenuSVG />
				</button>
			</div>
		</div>
	);
}

export default NavBarHorizontal;
