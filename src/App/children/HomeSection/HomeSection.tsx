import BubbleTextButton from "helper-views/BubbleTextButton/BubbleTextButton";
import { addStarEffectToCanvas } from "helpers/starsBackgroundEffect";
import React, { useLayoutEffect, useRef } from "react";
import styles from "./HomeSection.module.scss";
export interface HomeSectionProps
	extends React.HTMLAttributes<HTMLDivElement> {}

function HomeSection(props: HomeSectionProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useLayoutEffect(() => {
		addStarEffectToCanvas(canvasRef.current!);
	}, []);

	return (
		<div
			{...props}
			className={[styles.HomeSection, props.className].asClassString()}
		>
			<canvas ref={canvasRef} className={styles.starsCanvas}></canvas>

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

export default HomeSection;
