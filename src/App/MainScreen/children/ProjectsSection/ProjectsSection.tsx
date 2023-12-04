import {
  DocumentViewer,
  DocumentViewerItem,
  DocumentViewerRef,
} from '@/App/MainScreen/children/ProjectsSection/DocumentViewer/DocumentViewer';
import SectionHeader from 'helper-views/SectionHeader/SectionHeader';
import { usePresentationController } from 'helpers/AnimationController';
import React, { useEffect, useRef } from 'react';
import { extend } from 'react-extend-components';
import { ProjectView } from './ProjectView';
import styles from './ProjectsSection.module.scss';
import { allProjects } from './projectsData';

const ProjectsSection = extend('div')((Root) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const sectionHeaderRef = useRef<HTMLHeadingElement>(null);
  const projectRefs = useRef(
    allProjects.map(() => React.createRef<HTMLDivElement>()),
  ).current;

  const presentationController = usePresentationController();
  const documentViewerRef = useRef<DocumentViewerRef>(null);

  useEffect(() => {
    presentationController.addSection({
      sectionRoot: rootRef.current!,
      presentationItems: [
        { slideUpElement: sectionHeaderRef.current! },
        ...projectRefs.map((x) => ({
          subsection: {
            sectionRoot: x.current!,
            presentationItems: [{ slideUpElement: x.current! }],
            threshold: 0.4,
          },
        })),
      ],
    });
  }, [presentationController, projectRefs, rootRef]);

  return (
    <Root ref={rootRef} className={styles.ProjectsSection}>
      <SectionHeader ref={sectionHeaderRef} titleText="Examples of My Work" />
      <div className="grid mt-[75px] gap-y-[clamp(40px,_8.33vw,_100px)]">
        {allProjects.map((project, index) => (
          <ProjectView
            ref={projectRefs[index]}
            project={project}
            alignment={index % 2 === 0 ? 'right' : 'left'}
            key={index}
            onShowImageClicked={() => {
              documentViewerRef.current?.show({
                initialItem: {
                  imageUrl: project.imageUrls[0],
                  project: project,
                },
                getNextItem: (currentItem: DocumentViewerItem) => {
                  const currentProjectIndex = allProjects.indexOf(
                    currentItem.project,
                  );
                  const currentImageIndex =
                    currentItem.project.imageUrls.indexOf(currentItem.imageUrl);
                  if (
                    currentImageIndex <
                    currentItem.project.imageUrls.length - 1
                  ) {
                    return {
                      imageUrl:
                        currentItem.project.imageUrls[currentImageIndex + 1],
                      project: currentItem.project,
                    };
                  } else {
                    const nextProject = allProjects[currentProjectIndex + 1];
                    if (nextProject == null) return null;
                    return {
                      imageUrl: nextProject.imageUrls[0],
                      project: nextProject,
                    };
                  }
                },
                getPreviousItem: (currentItem: DocumentViewerItem) => {
                  const currentProjectIndex = allProjects.indexOf(
                    currentItem.project,
                  );
                  const currentImageIndex =
                    currentItem.project.imageUrls.indexOf(currentItem.imageUrl);
                  if (currentImageIndex > 0) {
                    return {
                      imageUrl:
                        currentItem.project.imageUrls[currentImageIndex - 1],
                      project: currentItem.project,
                    };
                  } else {
                    const previousProject =
                      allProjects[currentProjectIndex - 1];
                    if (previousProject == null) return null;
                    return {
                      imageUrl:
                        previousProject.imageUrls[
                          previousProject.imageUrls.length - 1
                        ],
                      project: previousProject,
                    };
                  }
                },
              });
            }}
          />
        ))}
      </div>
      <DocumentViewer ref={documentViewerRef} />
    </Root>
  );
});
export default ProjectsSection;
