import BubbleTextButton from "helper-views/BubbleTextButton/BubbleTextButton";
import React from "react";
import styles from "./HomeSection.module.scss";

export interface HomeSectionProps
	extends React.HTMLAttributes<HTMLDivElement> {}

function HomeSection(props: HomeSectionProps) {
	return (
		<div
			{...props}
			className={[styles.HomeSection, props.className].asClassString()}
		>
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
			<div className={styles.footerView}>
				<div className={styles.content}>
					<div className={styles.contactLink}>contact@patrickhanna.dev</div>
					{/* <div className={styles.contactLink}>github/patrickjames242</div> */}
				</div>
			</div>
		</div>
	);
}

export default HomeSection;
