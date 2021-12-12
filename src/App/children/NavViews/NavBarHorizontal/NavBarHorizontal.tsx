import BubbleTextButton from "helper-views/BubbleTextButton/BubbleTextButton";
import BracketsSVG from "./brackets-icon";
import styles from "./NavBarHorizontal.module.scss";
import { Link } from "react-router-dom";
import MenuSVG from "../MenuSVG";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "App/helpers";
import NavLink from "../NavLink/NavLink";
import React from "react";
import { appRoutes } from "../helpers";

export interface NavBarHorizontalProps
	extends React.HTMLAttributes<HTMLDivElement> {}

function NavBarHorizontal({ ...reactProps }: NavBarHorizontalProps) {
	const appContext = useContext(AppContext);

	const [shouldContractNavBar, setShouldContractNavBar] = useState(false);

	useEffect(() => {
		const listener = () => {
			setShouldContractNavBar(window.scrollY > 5);
		};
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
			<Link
				className={[styles.nameBox, "fade-on-hover"].asClassString()}
				to="/"
			>
				<BracketsSVG />
				<div className={[styles.nameText].asClassString()}>
					<span className={styles.firstName}>Patrick</span>{" "}
					<span className={styles.lastName}>Hanna</span>
				</div>
			</Link>
			<div className={styles.rightSide}>
				{appRoutes.map(({ path, name }, i) => (
					<NavLink key={name} selected={i === 0} to={path} name={name} />
				))}
				<BubbleTextButton className={styles.resumeButton} title="Resume" />
				<button
					className={[styles.menuButton, "fade-on-hover"].asClassString()}
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
