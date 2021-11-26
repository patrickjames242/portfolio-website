import NavBar from "App/NavBar/NavBar";
import BubbleTextButton from "helper-views/BubbleTextButton/BubbleTextButton";
import { classNames, HTMLAttributes } from "helpers/general";
import styles from "./HomeScreen.module.scss";

export interface HomeScreenProps extends HTMLAttributes<HTMLDivElement> {}

function HomeScreen(props: HomeScreenProps) {
	return (
		<div {...props} className={classNames(styles.HomeScreen, props.className)}>
			<NavBar />
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
					title="Get in touch"
					className={styles.getInTouchButton}
				/>
			</div>
		</div>
	);
}

export default HomeScreen;
