import { MainScreenContext } from 'App/MainScreen/helpers';
import { BubbleTextAnchor } from 'helper-views/BubbleTextButton/BubbleTextButton';
import React, { useContext, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoutes, RouteType, useRouteTypeForCurrentRoute } from '../helpers';
import MenuSVG from '../MenuSVG';
import NavLink from '../NavLink/NavLink';
import BracketsSVG from './brackets-icon';
import styles from './NavBarHorizontal.module.scss';

export interface NavBarHorizontalProps
  extends React.HTMLAttributes<HTMLDivElement> {}

function NavBarHorizontal({
  ...reactProps
}: NavBarHorizontalProps): JSX.Element {
  const mainScreenContext = useContext(MainScreenContext);
  const navigate = useNavigate();
  const currentRouteType = useRouteTypeForCurrentRoute();
  const navBarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const listener = (): void => {
      const shouldNavBarBeContracted = window.scrollY > 5;
      navBarRef.current?.classList.toggle(
        styles.contracted,
        shouldNavBarBeContracted,
      );
    };
    const navBar = navBarRef.current!;
    navBar.style.transition = 'none';
    listener();
    navBar.getClientRects();
    navBar.style.removeProperty('transition');
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);

  return (
    <nav
      {...reactProps}
      className={[styles.NavBar, reactProps.className].asClassString()}
      ref={navBarRef}
    >
      <a
        className={[styles.nameBox].asClassString()}
        href="/"
        onClick={(event) => {
          event.preventDefault();
          if (currentRouteType === RouteType.home) {
            mainScreenContext?.animateToRouteType(RouteType.home);
          } else {
            navigate('/');
          }
        }}
      >
        <BracketsSVG />
        <div className={[styles.nameText].asClassString()}>
          <span className={styles.firstName}>Patrick</span>{' '}
          <span className={styles.lastName}>Hanna</span>
        </div>
      </a>
      <div className={styles.rightSide}>
        {appRoutes.map(({ routeType, name }) => (
          <NavLink key={name} routeType={routeType} />
        ))}
        <BubbleTextAnchor
          titleText="Résumé"
          className={styles.resumeButton}
          target="_blank"
          href="resume.pdf"
        ></BubbleTextAnchor>
        <button
          className={[styles.menuButton].asClassString()}
          onClick={() =>
            mainScreenContext.setMenuDrawerOpened(
              !mainScreenContext.menuDrawerIsOpened,
            )
          }
        >
          <MenuSVG />
        </button>
      </div>
    </nav>
  );
}

export default NavBarHorizontal;
