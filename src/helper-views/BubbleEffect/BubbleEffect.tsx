import React, { useCallback, useRef } from "react";
import styles from "./BubbleEffect.module.scss";

export interface BubbleEffectProps
	extends React.HTMLAttributes<HTMLDivElement> {
	bubbleColor?: string;
	bubbleAnimationSeconds?: number;
}

function BubbleEffect({
	bubbleColor,
	bubbleAnimationSeconds,
	...reactProps
}: BubbleEffectProps) {
	const rootRef = useRef<HTMLDivElement>(null);
	const bubbleRef = useRef<HTMLDivElement>(null);
	const animateBubble = useCallback(
		(type: "expand" | "contract", mouseEvent: MouseEvent) => {
			const bubbleView = bubbleRef.current!;
			const mouseCoordinate = mouseCoordinateWithinElement(
				mouseEvent,
				rootRef.current!
			);

			const bubbleRadius = (() => {
				const height = rootRef.current!.clientHeight;
				const width = rootRef.current!.clientWidth;
				const cornerDistancesFromMouse = [
					[0, 0],
					[width, 0],
					[0, height],
					[width, height],
				].map(([x, y]) => distanceBetweenTwoPoints({ x, y }, mouseCoordinate));
				return Math.max(...cornerDistancesFromMouse);
			})();

			bubbleView.style.setProperty("--bubble-radius", bubbleRadius + "px");
			bubbleView.style.top = mouseCoordinate.y - bubbleRadius + "px";
			bubbleView.style.left = mouseCoordinate.x - bubbleRadius + "px";
			bubbleView.classList.toggle(styles.expanded, type === "expand");
			bubbleView.style.setProperty(
				"--animation-duration",
				(bubbleAnimationSeconds ?? 0.6) + "s"
			);
		},
		[bubbleAnimationSeconds]
	);

	return (
		<div
			{...reactProps}
			ref={rootRef}
			className={[styles.BubbleEffect, reactProps.className].asClassString()}
			onMouseEnter={(event) => animateBubble("expand", event.nativeEvent)}
			onMouseLeave={(event) => animateBubble("contract", event.nativeEvent)}
		>
			<div
				ref={bubbleRef}
				className={styles.bubbleView}
				style={{ backgroundColor: bubbleColor }}
			></div>
		</div>
	);
}

type Coordinate = { x: number; y: number };

function distanceBetweenTwoPoints(p1: Coordinate, p2: Coordinate) {
	return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}

function mouseCoordinateWithinElement(
	event: MouseEvent,
	element: HTMLElement
): Coordinate {
	let rect = element.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top,
	};
}

export default BubbleEffect;
