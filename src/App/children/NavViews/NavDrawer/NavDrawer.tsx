import { animated, useSpring } from "@react-spring/web";
import { AppContext } from "App/helpers";
import React, { useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import NavBarVertical from "../NavBarVertical/NavBarVertical";
import styles from "./NavDrawer.module.scss";
import XIconSVG from "./XIconSVG";

export interface NavDrawerProps extends React.HTMLAttributes<HTMLDivElement> {
	shouldBeOpen: boolean;
}

const NavDrawer: React.FC<NavDrawerProps> = ({
	shouldBeOpen,
	...reactProps
}: NavDrawerProps) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const menuViewRef = useRef<HTMLDivElement>(null);
	const appContext = useContext(AppContext);

	useEffect(() => {
		document.body.style.overflow = shouldBeOpen ? "hidden" : "";
	}, [shouldBeOpen]);

	return (
		<animated.div
			{...reactProps}
			ref={rootRef}
			className={[styles.NavDrawer, reactProps.className].asClassString()}
			style={{
				...reactProps.style,
				...useSpring({
					right: shouldBeOpen
						? styles.content_OpenRightValue
						: styles.content_ClosedRightValue,
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
				<animated.div
					ref={menuViewRef}
					className={styles.menuView}
					style={{
						...useSpring({
							right: shouldBeOpen
								? styles.menu_OpenRightValue
								: styles.menu_ClosedRightValue,
						}),
					}}
				>
					<button
						className={styles.xButton}
						onClick={() => {
							appContext?.setMenuDrawerOpened(false);
						}}
					>
						<XIconSVG />
					</button>
					<NavBarVertical className={styles.NavBarVertical} />
				</animated.div>,
				document.body
			)}
		</animated.div>
	);
};

export default NavDrawer;
