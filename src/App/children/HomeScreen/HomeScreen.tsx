import BubbleTextButton from "helper-views/BubbleTextButton/BubbleTextButton";
import React from "react";
import NavBarHorizontal from "../NavViews/NavBarHorizontal/NavBarHorizontal";
import styles from "./HomeScreen.module.scss";

export interface HomeScreenProps extends React.HTMLAttributes<HTMLDivElement> {}

function HomeScreen(props: HomeScreenProps) {
	return (
		<div
			{...props}
			className={[styles.HomeScreen, props.className].asClassString()}
		>
			<NavBarHorizontal />
			<div className={styles.centerView}>
				<div className={styles.titleText}>
					Hey, I'm <span className={styles.highlighted}>Patrick Hanna</span>.
				</div>
				<div className={styles.subtitleText}>
					I Build Cool Apps and Websites.
				</div>
				<div className={styles.descriptionText}>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis ut sed
					neque excepturi amet facilis quis reiciendis consequatur itaque harum?
				</div>
				<BubbleTextButton
					title="View my work"
					className={styles.getInTouchButton}
				/>
			</div>
		</div>
	);
}

export default HomeScreen;
