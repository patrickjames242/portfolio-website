import styles from "./slide-up-animation.module.scss";

export function animateSlideUpElement(
	element: HTMLElement,
	delayInSeconds?: number
) {
	element.style.animationName = styles.slideUpElement;
	if (delayInSeconds != null) {
		element.style.animationDelay = delayInSeconds + "s";
	}
}
