import { useRef } from "react";
import { useSpring } from "react-spring";
import navConstants from "../children/NavViews/_nav-constants.module.scss";

export function getWindowScrollValueForSection(
	sectionRootElement: HTMLDivElement
) {
	const navBarHeight = parseFloat(navConstants.compactNavBarHeight);
	const elementHeight = sectionRootElement.clientHeight ?? 0;
	const elementDistanceFromTop =
		window.scrollY + sectionRootElement.getBoundingClientRect().top;
	const windowHeightWithoutNavBar = window.innerHeight - navBarHeight;

	const result = (() => {
		if (elementHeight < windowHeightWithoutNavBar) {
			return (
				elementDistanceFromTop -
				(windowHeightWithoutNavBar - elementHeight) / 2 -
				navBarHeight
			);
		} else {
			return elementDistanceFromTop - navBarHeight - 20;
		}
	})();
	return Math.min(result, document.body.clientHeight - window.innerHeight);
}

export function useReactSpringWindowScroller() {
	const [, springApi] = useSpring(() => ({ y: 0 }));
	const scrollScreenToYValue = useRef(async (yValue: number) => {
		await new Promise<undefined>((resolve) => {
			springApi.start({
				y: yValue,
				reset: true,
				from: { y: window.scrollY },
				onRest: () => {
					resolve(undefined);
				},
				onChange: (props) => {
					window.scroll(0, props.value.y);
				},
			});
		});
	}).current;
	return { scrollScreenToYValue };
}
