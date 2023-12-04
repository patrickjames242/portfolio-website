import { twClassNames } from '@/helpers/general/twClassNames';
import OrangeImageView from 'helper-views/OrangeImageView/OrangeImageView';
import AndroidIconSVG from 'helper-views/svg/AndroidIconSVG';
import AppleIconSVG from 'helper-views/svg/AppleIconSVG';
import ExternalLink from 'helper-views/svg/ExternalLinkSVG';
import GithubSVG from 'helper-views/svg/GithubSVG';
import TriangleIconSVG from 'helper-views/svg/TriangleSVG';
import { useLayoutEffect, useRef } from 'react';
import { extend } from 'react-extend-components';
import styles from './ProjectsSection.module.scss';
import { Project } from './projectsData';

export const ProjectView = extend('div')<{
  alignment: 'left' | 'right';
  project: Project;
  onShowImageClicked: () => void;
}>((Root, { alignment, project, onShowImageClicked }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const detailsSectionRef = useRef<HTMLDivElement>(null);
  const titleSectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const matcher = window.matchMedia(
      `(min-width: ${styles.maxNarrowScreenWidth})`,
    );
    const listener = (): void => {
      const areProjectsExpanded = matcher.matches;
      if (areProjectsExpanded) {
        detailsSectionRef.current?.insertBefore(
          titleSectionRef.current!,
          detailsSectionRef.current!.childNodes[0],
        );
      } else {
        rootRef.current?.insertBefore(
          titleSectionRef.current!,
          rootRef.current!.childNodes[0],
        );
      }
    };
    listener();
    matcher.addEventListener('change', listener);
    return () => {
      matcher.removeEventListener('change', listener);
    };
  }, [rootRef]);

  return (
    <Root
      ref={rootRef}
      className={twClassNames(
        styles.ProjectView,
        styles[alignment],
        'grid  gap-[20px] items-center',
        {
          'project-wide-layout:grid-cols-[1.5fr_2fr]': alignment === 'left',
          'project-wide-layout:grid-cols-[2fr_1.5fr]': alignment === 'right',
        },
      )}
    >
      <div
        ref={titleSectionRef}
        className={twClassNames(styles.titleSection, 'grid gap-[5px]')}
      >
        <div className="text-[16px] text-accent font-medium">
          {project.subtitle}
        </div>
        <div className="text-[28px] font-medium">{project.title}</div>
      </div>
      <div
        ref={detailsSectionRef}
        className={twClassNames('grid gap-[15px] z-[5]', {
          'project-wide-layout:text-right': alignment === 'right',
        })}
        style={{ gridArea: 'detailsSection' }}
      >
        <div
          className={twClassNames(
            'bg-lighter-background p-[25px] rounded-[20px] text-lighter-text leading-[1.3] text-[18px] grid-area',
            {
              'project-wide-layout:mr-[-80px]': alignment === 'left',
              'project-wide-layout:ml-[-80px]': alignment === 'right',
            },
          )}
        >
          {project.description}
        </div>
        <div
          className={twClassNames(
            'text-[16px] flex flex-row flex-wrap ml-[-1.1em] mt-[calc(-1.1em_+_10px)] mb-[7px]',
            {
              'justify-start project-wide-layout:justify-end':
                alignment === 'right',
            },
          )}
        >
          {project.technologies.map((x, index) => (
            <a
              className="grid grid-flow-col gap-[5px] ml-[1.1em] mt-[1.1em] group"
              href={x.url}
              target="_blank"
              rel="noreferrer"
              key={index}
            >
              <TriangleIconSVG className="h-[10px] w-[10px] fill-light-text transition-colors group-hover:fill-accent" />
              <div className="text-light-text leading-[1] duration-[0.2s] transition-colors group-hover:text-accent">
                {x.name}
              </div>
            </a>
          ))}
        </div>
        <div
          className={twClassNames('grid  grid-flow-col gap-[15px]', {
            'justify-start': alignment === 'left',
            'justify-start project-wide-layout:justify-end':
              alignment === 'right',
          })}
        >
          {[
            {
              href: project.githubLink,
              svg: GithubSVG,
            },
            {
              href: project.playStoreLink,
              svg: AndroidIconSVG,
            },
            {
              href: project.appStoreLink,
              svg: AppleIconSVG,
            },
            {
              className: '[&>svg]:fill-none [&>svg]:stroke-accent',
              href: project.websiteLink,
              svg: ExternalLink,
            },
          ].compactMap((x, i) =>
            x.href == null ? null : (
              <a
                className={twClassNames('fade-on-hover', x.className)}
                href={x.href}
                target="_blank"
                rel="noreferrer"
                key={i}
              >
                {<x.svg className="w-[28px] h-[28px] fill-accent" />}
              </a>
            ),
          )}
        </div>
      </div>
      <OrangeImageView
        className=""
        imageUrls={project.imageUrls}
        style={{ gridArea: 'imageView' }}
        onClick={() => {
          onShowImageClicked();
        }}
      />
    </Root>
  );
});
