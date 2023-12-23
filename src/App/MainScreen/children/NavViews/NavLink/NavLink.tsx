import { twClassNames } from '@/helpers/general/twClassNames';
import { MainScreenContext } from 'App/MainScreen/helpers';
import { useContext, useMemo } from 'react';
import { extend } from 'react-extend-components';
import {
  RouteType,
  getInfoForRouteType,
  useRouteTypeNavigation,
} from '../helpers';

const NavLink = extend('a')<{ routeType: RouteType }>((Root, { routeType }) => {
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
    <Root
      className={twClassNames(
        'text-[19px] text-lighter-text font-medium grid grid-flow-col gap-[0.4em] items-center transition-[color] duration-[0.3s] pointer-events-auto relative',
        'hover:text-accent hover:font-medium',
        { 'text-accent font-medium': isSelected },
      )}
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
      <div className="leading-[1] flex-row flex gap-[0.2em] items-center">
        <div className="text-[1.6em] opacity-40 translate-y-[0.05em] font-medium">
          {'< '}
        </div>
        {routeInfo.name}
        <div className=" text-[1.2em] opacity-40 translate-y-[0.05em] font-medium">
          {' />'}
        </div>
      </div>
    </Root>
  );
});

export default NavLink;
