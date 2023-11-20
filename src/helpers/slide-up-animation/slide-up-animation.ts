import styles from './slide-up-animation.module.scss';

const slideUpAnimation = styles.slideUpElement;

export function animateSlideUpElement(
  element: HTMLElement,
  delayInSeconds?: number,
): { animationLengthSeconds: number } {
  element.addEventListener('animationend', function listener(event) {
    if (event.animationName === slideUpAnimation) {
      element.classList.toggle(styles.done, true);
      element.style.animationName = '';
      element.removeEventListener('animationend', listener);
    }
  });

  if (delayInSeconds != null) {
    element.style.animationDelay = delayInSeconds + 's';
  }
  element.style.animationName = slideUpAnimation;
  const animationLengthSeconds =
    parseFloat(styles.slideUpAnimationDuration) + (delayInSeconds ?? 0);
  return { animationLengthSeconds };
}
