import { MainScreenContext } from 'App/MainScreen/helpers';
import React, { useContext, useMemo } from 'react';
import TriangleIconSVG from '../../../../../helper-views/svg/TriangleSVG';
import {
  getInfoForRouteType,
  RouteType,
  useRouteTypeNavigation,
} from '../helpers';
import styles from './NavLink.module.scss';

export interface NavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  routeType: RouteType;
}

const NavLink: React.FC<NavLinkProps> = ({
  routeType,
  ...reactProps
}: NavLinkProps) => {
  const navigateToRouteType = useRouteTypeNavigation();
  const routeInfo = getInfoForRouteType(routeType);
  const mainScreenContext = useContext(MainScreenContext);
  const isSelected = useMemo(() => {
    if (mainScreenContext.screenSectionCurrentlyBeingAnimatedTo != null) {
      return (
        mainScreenContext.screenSectionCurrentlyBeingAnimatedTo === routeType
      );
    } else {
      return mainScreenContext.currentlyVisibleScreenSection === routeType;
    }
  }, [
    mainScreenContext.currentlyVisibleScreenSection,
    mainScreenContext.screenSectionCurrentlyBeingAnimatedTo,
    routeType,
  ]);
  return (
    <a
      {...reactProps}
      className={[
        styles.NavLink,
        isSelected ? styles.selected : undefined,
        reactProps.className,
      ].asClassString()}
      href={routeInfo.path}
      onClick={(event) => {
        event.preventDefault();
        mainScreenContext.setMenuDrawerOpened(false);

        /*
					The disappearance and reappearance of the scroll bar (caused by the showing and 
					hiding of the menu) messes with our calculation of the scroll position of screen 
					sections. I'm using set timeout to give the scroll bar a chance to show up before we try scrolling to the appropriate section
				*/
        setTimeout(() => {
          navigateToRouteType(routeType);
        }, 0);
      }}
    >
      <TriangleIconSVG />
      <div className={styles.text}>{routeInfo.name}</div>
    </a>
  );
};

export default NavLink;
