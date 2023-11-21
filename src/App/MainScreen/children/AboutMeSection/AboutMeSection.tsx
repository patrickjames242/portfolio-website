import { usePresentationController } from 'helpers/AnimationController';
import React, { useEffect, useRef } from 'react';
import styles from './AboutMeSection.module.scss';
import {
  TechnologiesSection,
  TechnologiesSectionRef,
} from './TechnologiesSection';
import {
  IntroductionSection,
  IntroductionSectionRef,
} from './IntroductionSection';

export interface AboutMeSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AboutMeSection: React.ForwardRefRenderFunction<
  HTMLDivElement,
  AboutMeSectionProps
> = ({ ...htmlAttributes }, ref) => {
  const introductionRef = useRef<IntroductionSectionRef>(null);
  const technologiesRef = useRef<TechnologiesSectionRef>(null);
  const presentationController = usePresentationController();

  useEffect(() => {
    // just giving the introduction section a chance to layout its views properly before we add the intersection observables
    setTimeout(() => {
      presentationController.addSection({
        threshold: 0.2,
        presentationItems: [
          { subsection: introductionRef.current!.getPresentationSection() },
          { subsection: technologiesRef.current!.getPresentationSection() },
        ],
      });
    }, 50);
  }, [presentationController]);

  return (
    <div
      {...htmlAttributes}
      ref={ref}
      className={[
        styles.AboutMeSection,
        htmlAttributes.className,
      ].asClassString()}
    >
      <div className={styles.backgroundView} />
      <IntroductionSection ref={introductionRef} />
      <TechnologiesSection ref={technologiesRef} />
    </div>
  );
};

export default React.forwardRef(AboutMeSection);
