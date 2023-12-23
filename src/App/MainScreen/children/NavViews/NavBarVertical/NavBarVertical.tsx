import { BubbleTextButton } from 'helper-views/BubbleTextButton/BubbleTextButton';
import { useRef } from 'react';
import { extend } from 'react-extend-components';
import {
  DocumentViewer,
  DocumentViewerRef,
} from '../../ProjectsSection/DocumentViewer/DocumentViewer';
import NavLink from '../NavLink/NavLink';
import { appRoutes, resumeDocumentViewerCollection } from '../helpers';
import styles from './NavBarVertical.module.scss';

const NavBarVertical = extend('div')((Root) => {
  const documentViewerRef = useRef<DocumentViewerRef>(null);

  return (
    <Root className={styles.NavBarVertical}>
      {appRoutes.map(({ routeType, name }) => (
        <NavLink
          key={name}
          routeType={routeType}
          style={{ fontSize: 21, fontWeight: 400 }}
        ></NavLink>
      ))}
      <BubbleTextButton
        titleText="Résumé"
        className={styles.resumeButton}
        onClick={() => {
          documentViewerRef.current?.show(resumeDocumentViewerCollection());
        }}
      ></BubbleTextButton>
      <DocumentViewer ref={documentViewerRef} />
    </Root>
  );
});

export default NavBarVertical;
