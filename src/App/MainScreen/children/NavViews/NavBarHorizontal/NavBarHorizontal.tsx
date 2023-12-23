import { MainScreenContext } from 'App/MainScreen/helpers';
import { BubbleTextButton } from 'helper-views/BubbleTextButton/BubbleTextButton';
import { useContext, useLayoutEffect, useRef } from 'react';
import { extend } from 'react-extend-components';
import { useNavigate } from 'react-router-dom';
import {
  DocumentViewer,
  DocumentViewerRef,
} from '../../ProjectsSection/DocumentViewer/DocumentViewer';
import MenuSVG from '../MenuSVG';
import NavLink from '../NavLink/NavLink';
import {
  RouteType,
  appRoutes,
  resumeDocumentViewerCollection,
  useRouteTypeForCurrentRoute,
} from '../helpers';
import styles from './NavBarHorizontal.module.scss';
import BracketsSVG from './brackets-icon';

const NavBarHorizontal = extend('nav')((Root) => {
  const mainScreenContext = useContext(MainScreenContext);
  const navigate = useNavigate();
  const currentRouteType = useRouteTypeForCurrentRoute();
  const navBarRef = useRef<HTMLDivElement>(null);

  const documentViewerRef = useRef<DocumentViewerRef>(null);

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
    <Root className={styles.NavBar} ref={navBarRef}>
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
        <BubbleTextButton
          titleText="Résumé"
          className={styles.resumeButton}
          onClick={() => {
            documentViewerRef.current?.show(resumeDocumentViewerCollection());
          }}
        />
        <DocumentViewer ref={documentViewerRef} />
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
    </Root>
  );
});

export default NavBarHorizontal;
