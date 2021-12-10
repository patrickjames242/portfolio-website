import BubbleTextButton from "helper-views/BubbleTextButton/BubbleTextButton";
import BracketsSVG from "./brackets-icon";
import styles from "./NavBarHorizontal.module.scss";
import { Link } from "react-router-dom";
import MenuSVG from "../MenuSVG";
import { useContext } from "react";
import { AppContext } from "App/helpers";
import NavLink from "../NavLink/NavLink";
import React from "react";
import { appRoutes } from "../helpers";

export interface NavBarHorizontalProps
	extends React.HTMLAttributes<HTMLDivElement> {}

function NavBarHorizontal({ ...reactProps }: NavBarHorizontalProps) {
	const appContext = useContext(AppContext);
	return (
		<div
			{...reactProps}
			className={[styles.NavBar, reactProps.className].asClassString()}
		>
			<Link className={styles.nameBox} to="/">
				<BracketsSVG />
				<div className={styles.nameText}>
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
					className={styles.menuButton}
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
