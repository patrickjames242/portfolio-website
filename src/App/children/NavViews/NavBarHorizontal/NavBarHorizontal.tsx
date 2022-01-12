import { AppContext } from "App/helpers";
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
			<Link className={[styles.nameBox].asClassString()} to="/">
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
