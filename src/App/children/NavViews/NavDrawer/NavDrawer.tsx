import { animated, useSpring } from "@react-spring/web";
import { MainScreenContext } from "App/helpers";
import { clampNum, useDidValueChange } from "helpers/hooks";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";
import NavBarVertical from "../NavBarVertical/NavBarVertical";
import navConstants from "../_nav-constants.module.scss";
import styles from "./NavDrawer.module.scss";
import XIconSVG from "./XIconSVG";

export interface NavDrawerProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavDrawer: React.FC<NavDrawerProps> = ({
	...reactProps
}: NavDrawerProps) => {
	const appContext = useContext(MainScreenContext);
	const [menuWidth, setMenuWidth] = useState(0);

	const shouldBeOpen = appContext.menuDrawerIsOpened;
	const shouldBeOpenChanged = useDidValueChange(shouldBeOpen);

	useLayoutEffect(() => {
		function updateMenuWidth() {
			setMenuWidth(
				clampNum(window.innerWidth - 50, {
					min: 200,
					max: 400,
				})
			);
		}
		function closeMenuIfNeeded() {
			if (
				document.body.offsetWidth >
					Number(navConstants.maxShortenedHorizontalNavBarWidth) &&
				shouldBeOpen
			) {
				appContext?.setMenuDrawerOpened(false);
			}
		}
		const listener = () => {
			updateMenuWidth();
			closeMenuIfNeeded();
		};
		listener();
		window.addEventListener("resize", listener);
		return () => window.removeEventListener("resize", listener);
	}, [appContext, shouldBeOpen]);

	useEffect(() => {
		document.body.style.overflow = shouldBeOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = null as any;
		};
	}, [shouldBeOpen]);

	return (
		<animated.div
			{...reactProps}
			className={[styles.NavDrawer, reactProps.className].asClassString()}
			style={{
				...reactProps.style,
				...useSpring({
					immediate: shouldBeOpenChanged === false,
					right: shouldBeOpen ? menuWidth : 0,
				}),
			}}
		>
			<animated.div
				className={styles.contentContainer}
				style={{
					...useSpring({
						opacity: shouldBeOpen ? 0.5 : 1,
					}),
				}}
			>
				{reactProps.children}
			</animated.div>
			<div
				className={styles.contentCover}
				style={{
					pointerEvents: shouldBeOpen ? "auto" : "none",
				}}
				onClick={() => {
					if (shouldBeOpen) {
						appContext?.setMenuDrawerOpened(false);
					}
				}}
			/>
			{ReactDOM.createPortal(
				<MenuView shouldBeOpen={shouldBeOpen} menuWidth={menuWidth} />,
				document.body
			)}
		</animated.div>
	);
};

export default NavDrawer;

interface MenuViewProps extends React.HTMLAttributes<HTMLDivElement> {
	shouldBeOpen: boolean;
	menuWidth: number;
}

const MenuView: React.FC<MenuViewProps> = ({
	shouldBeOpen,
	menuWidth,
	...htmlAttributes
}: MenuViewProps) => {
	const appContext = useContext(MainScreenContext);
	const shouldBeOpenDidChange = useDidValueChange(shouldBeOpen);

	return (
		<animated.div
			{...htmlAttributes}
			className={styles.MenuView}
			style={{
				width: menuWidth,
				...useSpring({
					immediate: shouldBeOpenDidChange === false,
					right: shouldBeOpen ? 0 : -menuWidth,
				}),
			}}
		>
			<div className={styles.content}>
				<NavBarVertical className={styles.NavBarVertical} />
			</div>
			<button
				className={styles.xButton}
				onClick={() => {
					appContext?.setMenuDrawerOpened(false);
				}}
			>
				<XIconSVG />
			</button>
		</animated.div>
	);
};
