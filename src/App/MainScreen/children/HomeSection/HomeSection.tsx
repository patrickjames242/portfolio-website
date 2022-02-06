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
				<h1 className={styles.titleText}>
					Hey, I'm <span className={styles.highlighted}>Patrick Hanna</span>.
				</h1>
				<h2 className={styles.subtitleText}>I Build Cool Apps and Websites.</h2>
				<p className={styles.descriptionText}>
					I'm a software developer with a focus on front-end and back-end web
					development, cross platform app development, and native iOS
					development.
				</p>
				<BubbleTextAnchor
					titleText="Get in touch"
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
