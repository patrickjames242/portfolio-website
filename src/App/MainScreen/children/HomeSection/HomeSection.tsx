import { BubbleTextAnchor } from "helper-views/BubbleTextButton/BubbleTextButton";
import { addStarEffectToCanvas } from "helpers/starsBackgoundEffect/starsBackgroundEffect";
import React, { useLayoutEffect, useRef } from "react";
import {
	getInfoForRouteType,
	RouteType,
	useRouteTypeNavigation,
} from "../NavViews/helpers";
import styles from "./HomeSection.module.scss";
export interface HomeSectionProps
	extends React.HTMLAttributes<HTMLDivElement> {}

const HomeSection: React.ForwardRefRenderFunction<
	HTMLDivElement,
	HomeSectionProps
> = (props, ref) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const navigateToRouteType = useRouteTypeNavigation();

	useLayoutEffect(() => {
		addStarEffectToCanvas(canvasRef.current!);
	}, []);

	return (
		<div
			{...props}
			ref={ref}
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
				<BubbleTextAnchor
					title="Get in touch"
					className={styles.getInTouchButton}
					href={getInfoForRouteType(RouteType.contactMe).path}
					onClick={(event) => {
						event.preventDefault();
						navigateToRouteType(RouteType.contactMe);
					}}
				/>
			</div>
		</div>
	);
};

export default React.forwardRef(HomeSection);
