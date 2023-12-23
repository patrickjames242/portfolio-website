import {
  RouteType,
  useRouteTypeForCurrentRoute,
} from 'App/MainScreen/children/NavViews/helpers';
import 'helpers/prototypeExtensions';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import AboutMeSection from './children/AboutMeSection/AboutMeSection';
import ContactMeSection from './children/ContactMeSection/ContactMeSection';
import HomeSection from './children/HomeSection/HomeSection';
import NavBarHorizontal from './children/NavViews/NavBarHorizontal/NavBarHorizontal';
import NavDrawer from './children/NavViews/NavDrawer/NavDrawer';
import PageFooter from './children/PageFooter/PageFooter';
import ProjectsSection from './children/ProjectsSection/ProjectsSection';
import {
  MainScreenContext,
  MainScreenContextValue,
  getCompactNavBarHeight,
  getWindowScrollValueForSection,
  useReactSpringWindowScroller,
} from './helpers';

export default function MainScreen(): JSX.Element {
  const [shouldDrawerBeOpen, setShouldDrawerBeOpen] = useState(false);
  const [currentlyVisibleScreenSection, setCurrentlyVisibleScreenSection] =
    useState<RouteType | null>(null);
  const [
    screenSectionCurrentlyBeingAnimatedTo,
    setScreenSectionCurrentlyBeingAnimatedTo,
  ] = useState<RouteType | null>(null);

  const sectionRefs: Record<
    RouteType,
    React.RefObject<HTMLDivElement>
  > = useRef({
    [RouteType.home]: useRef<HTMLDivElement>(null),
    [RouteType.aboutMe]: useRef<HTMLDivElement>(null),
    [RouteType.projects]: useRef<HTMLDivElement>(null),
    [RouteType.contactMe]: useRef<HTMLDivElement>(null),
  }).current;

  const currentRouteType = useRouteTypeForCurrentRoute();

  const { scrollScreenToYValue } = useReactSpringWindowScroller();

  const animateToRouteType = useCallback(
    async (routeType: RouteType | null) => {
      const yPositionToScrollTo = (() => {
        if (
          routeType &&
          new Set([
            RouteType.aboutMe,
            RouteType.projects,
            RouteType.contactMe,
          ]).has(routeType)
        ) {
          return getWindowScrollValueForSection(
            sectionRefs[routeType].current!,
          );
        } else return 0;
      })();
      if (Math.round(window.scrollY) === Math.round(yPositionToScrollTo))
        return;
      setScreenSectionCurrentlyBeingAnimatedTo(routeType);
      await scrollScreenToYValue(yPositionToScrollTo);
      setScreenSectionCurrentlyBeingAnimatedTo(null);
    },
    [scrollScreenToYValue, sectionRefs],
  );

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual';
    setTimeout(() => {
      window.history.scrollRestoration = 'auto';
      animateToRouteType(currentRouteType);
    }, 50);
  }, [animateToRouteType, currentRouteType]);

  useLayoutEffect(() => {
    const routeTypesInOrder = Object.freeze([
      RouteType.home,
      RouteType.aboutMe,
      RouteType.projects,
      RouteType.contactMe,
    ]);

    function updateVisibleScreenSection(): void {
      const targetRouteType = (() => {
        const getElementTop = (el: HTMLElement): number =>
          el.getBoundingClientRect().top + window.scrollY;

        const navBarHeight = getCompactNavBarHeight();
        const windowContainerTop = window.scrollY + navBarHeight;
        const windowContainerHeight = window.innerHeight - navBarHeight;

        let routeTypeToReturn: RouteType | null = null;

        for (const routeType of routeTypesInOrder) {
          const el = sectionRefs[routeType]?.current;
          if (el == null) continue;
          if (
            getElementTop(el) <=
              windowContainerTop + windowContainerHeight * 0.4 &&
            getElementTop(el) + el.offsetHeight > windowContainerTop + 100
          ) {
            routeTypeToReturn = routeType;
          } else if (routeTypeToReturn != null) {
            return routeTypeToReturn;
          }
        }
        return routeTypeToReturn;
      })();
      setCurrentlyVisibleScreenSection(targetRouteType);
    }
    updateVisibleScreenSection();
    window.addEventListener('resize', updateVisibleScreenSection);
    window.addEventListener('scroll', updateVisibleScreenSection);
    return () => {
      window.removeEventListener('resize', updateVisibleScreenSection);
      window.removeEventListener('scroll', updateVisibleScreenSection);
    };
  }, [sectionRefs]);

  const contextValue: MainScreenContextValue = useMemo(
    () => ({
      menuDrawerIsOpened: shouldDrawerBeOpen,
      currentlyVisibleScreenSection,
      screenSectionCurrentlyBeingAnimatedTo,
      setMenuDrawerOpened: setShouldDrawerBeOpen,
      animateToRouteType: animateToRouteType,
    }),
    [
      animateToRouteType,
      currentlyVisibleScreenSection,
      screenSectionCurrentlyBeingAnimatedTo,
      shouldDrawerBeOpen,
    ],
  );

  return (
    <MainScreenContext.Provider value={contextValue}>
      <NavDrawer>
        <div className="pointer-events-none relative">
          <NavBarHorizontal className="sticky top-0" />
          <div className="max-w-[1200px] mx-auto">
            <div className="mx-[var(--screen-side-insets)]">
              <HomeSection ref={sectionRefs[RouteType.home]} />
              <AboutMeSection
                className="pointer-events-auto mt-[clamp(100px,_16vw,_200px)]"
                ref={sectionRefs[RouteType.aboutMe]}
              />
              <ProjectsSection
                className="pointer-events-auto mt-[clamp(100px,_16vw,_200px)]"
                ref={sectionRefs[RouteType.projects]}
              />
              <ContactMeSection
                className="pointer-events-auto mt-[clamp(100px,_16vw,_200px)]"
                ref={sectionRefs[RouteType.contactMe]}
              />
              <PageFooter className="pointer-events-auto mt-[clamp(100px,_9vw,_130px)]" />
            </div>
          </div>
        </div>
      </NavDrawer>
    </MainScreenContext.Provider>
  );
}
