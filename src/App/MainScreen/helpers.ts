import { RouteType } from 'App/MainScreen/children/NavViews/helpers';
import React, { useRef } from 'react';
import { useSpring } from 'react-spring';
import navConstants from './children/NavViews/_nav-constants.module.scss';

export interface MainScreenContextValue {
  menuDrawerIsOpened: boolean;
  currentlyVisibleScreenSection: RouteType | null;
  screenSectionCurrentlyBeingAnimatedTo: RouteType | null;
  setMenuDrawerOpened(shouldBeOpened: boolean): void;
  animateToRouteType(routeType: RouteType): void;
}

export const MainScreenContext = React.createContext<MainScreenContextValue>({
  menuDrawerIsOpened: false,
  currentlyVisibleScreenSection: null,
  screenSectionCurrentlyBeingAnimatedTo: null,
  setMenuDrawerOpened: () => {
    //
  },
  animateToRouteType: () => {
    //
  },
});

export function getCompactNavBarHeight(): number {
  return parseFloat(navConstants.compactNavBarHeight);
}

export function getWindowScrollValueForSection(
  sectionRootElement: HTMLDivElement,
): number {
  const navBarHeight = getCompactNavBarHeight();
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

export function useReactSpringWindowScroller(): {
  scrollScreenToYValue: (yValue: number) => Promise<void>;
} {
  const [, springApi] = useSpring(() => ({ y: 0 }));
  const scrollScreenToYValue = useRef(async (yValue: number) => {
    await new Promise<undefined>((resolve) => {
      springApi.start({
        reset: true,
        from: { y: window.scrollY },
        to: { y: yValue },
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
