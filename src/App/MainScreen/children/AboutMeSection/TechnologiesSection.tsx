import SectionHeader from 'helper-views/SectionHeader/SectionHeader';
import { PresentationSection } from 'helpers/AnimationController';
import { technologiesList } from 'helpers/technologies/technologies';
import React from 'react';
import { useImperativeHandle, useRef } from 'react';
import styles from './AboutMeSection.module.scss';

export interface TechnologiesSectionRef {
  getPresentationSection(): PresentationSection;
}

export interface TechnologiesSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {}
export const TechnologiesSection = (() => {
  const TechnologiesSection: React.ForwardRefRenderFunction<
    TechnologiesSectionRef,
    TechnologiesSectionProps
  > = ({ ...htmlAttributes }, forwardedRef) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const sectionHeaderRef = useRef<HTMLDivElement>(null);
    const technologiesGridRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(
      forwardedRef,
      () => ({
        getPresentationSection() {
          return {
            sectionRoot: rootRef.current!,
            threshold: 0.05,
            presentationItems: [
              { slideUpElement: sectionHeaderRef.current! },
              { slideUpElement: technologiesGridRef.current! },
            ],
          };
        },
      }),
      [],
    );

    return (
      <div
        {...htmlAttributes}
        className={[
          styles.TechnologiesSection,
          htmlAttributes.className,
        ].asClassString()}
        ref={rootRef}
      >
        <SectionHeader
          ref={sectionHeaderRef}
          titleText="Technologies I've Used"
          includeLine={false}
          className="slide-up-element"
        />
        <div
          ref={technologiesGridRef}
          className={[styles.technologiesGrid].asClassString()}
        >
          {technologiesList.map((x) => (
            <a
              key={x.name}
              href={x.url}
              title={x.name}
              target="_blank"
              rel="noreferrer"
            >
              <img src={x.iconSrc} alt={x.name} />
            </a>
          ))}
        </div>
      </div>
    );
  };

  return React.forwardRef(TechnologiesSection);
})();
