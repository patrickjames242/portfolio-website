import { animated, useSpring } from '@react-spring/web';
import { MainScreenContext } from 'App/MainScreen/helpers';
import { clampNum } from 'helpers/general';
import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import NavBarVertical from '../NavBarVertical/NavBarVertical';
import navConstants from '../_nav-constants.module.scss';
import styles from './NavDrawer.module.scss';
import XIconSVG from './XIconSVG';

export interface NavDrawerProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavDrawer: React.FC<NavDrawerProps> = ({
  ...reactProps
}: NavDrawerProps) => {
  const appContext = useContext(MainScreenContext);
  const [menuWidth, setMenuWidth] = useState(0);

  const shouldBeOpen = appContext.menuDrawerIsOpened;

  const menuRef = useRef<MenuViewRef>(null);

  useLayoutEffect(() => {
    function updateMenuWidth() {
      const newMenuWidth = clampNum(window.innerWidth - 50, {
        min: 200,
        max: 400,
      });
      setMenuWidth(newMenuWidth);
      menuRef.current?.setMenuWidth(newMenuWidth);
    }
    function closeMenuIfNeeded() {
      if (
        document.body.offsetWidth >
          Number(navConstants.maxShortenedHorizontalNavBarWidth) &&
        shouldBeOpen
      ) {
        appContext?.setMenuDrawerOpened(false);
      }
    }
    const listener = () => {
      updateMenuWidth();
      closeMenuIfNeeded();
    };
    listener();
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [appContext, shouldBeOpen]);

  useEffect(() => {
    document.body.style.overflow = shouldBeOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = null as any;
    };
  }, [shouldBeOpen]);

  return (
    <animated.div
      {...reactProps}
      className={[styles.NavDrawer, reactProps.className].asClassString()}
      style={{
        ...reactProps.style,
        ...useSpring({
          right: shouldBeOpen ? menuWidth : 0,
        }),
      }}
    >
      <animated.div
        className={styles.contentContainer}
        style={{
          ...useSpring({
            opacity: shouldBeOpen ? 0.5 : 1,
          }),
        }}
      >
        {reactProps.children}
      </animated.div>
      <div
        className={styles.contentCover}
        style={{
          pointerEvents: shouldBeOpen ? 'auto' : 'none',
        }}
        onClick={() => {
          if (shouldBeOpen) {
            appContext?.setMenuDrawerOpened(false);
          }
        }}
      />
      {ReactDOM.createPortal(<MenuView ref={menuRef} />, document.body)}
    </animated.div>
  );
};

export default NavDrawer;

interface MenuViewRef {
  setMenuWidth(width: number): void;
}

interface MenuViewProps extends React.HTMLAttributes<HTMLDivElement> {}

const MenuView = (() => {
  const MenuView: React.ForwardRefRenderFunction<MenuViewRef, MenuViewProps> = (
    { ...htmlAttributes }: MenuViewProps,
    ref,
  ) => {
    const appContext = useContext(MainScreenContext);
    const shouldBeOpen = appContext.menuDrawerIsOpened;

    const latestMenuWidth = useRef<number>(0);

    const getRootStyleProps = useRef(
      (shouldBeOpen: boolean, menuWidth: number) => ({
        right: shouldBeOpen ? 0 : -menuWidth,
        width: menuWidth,
      }),
    ).current;

    const [springStyles, api] = useSpring(() => getRootStyleProps);

    useImperativeHandle(
      ref,
      () => ({
        setMenuWidth(width) {
          if (latestMenuWidth.current === width) return;
          latestMenuWidth.current = width;
          api.start({
            ...getRootStyleProps(shouldBeOpen, latestMenuWidth.current),
            immediate: true,
          });
        },
      }),
      [api, getRootStyleProps, shouldBeOpen],
    );

    useLayoutEffect(() => {
      api.start({
        to: getRootStyleProps(shouldBeOpen, latestMenuWidth.current),
      });
    }, [api, getRootStyleProps, shouldBeOpen]);

    return (
      <animated.div
        {...htmlAttributes}
        className={styles.MenuView}
        style={springStyles}
      >
        <div className={styles.content}>
          <NavBarVertical className={styles.NavBarVertical} />
        </div>
        <button
          className={styles.xButton}
          onClick={() => {
            appContext?.setMenuDrawerOpened(false);
          }}
        >
          <XIconSVG />
        </button>
      </animated.div>
    );
  };

  return React.forwardRef(MenuView);
})();
