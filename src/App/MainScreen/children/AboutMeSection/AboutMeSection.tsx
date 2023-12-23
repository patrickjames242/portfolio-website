import { usePresentationController } from 'helpers/AnimationController';
import { useEffect, useRef } from 'react';
import { extend } from 'react-extend-components';
import styles from './AboutMeSection.module.scss';
import {
  IntroductionSection,
  IntroductionSectionRef,
} from './IntroductionSection';
import {
  TechnologiesSection,
  TechnologiesSectionRef,
} from './TechnologiesSection';

const AboutMeSection = extend('div')((Root) => {
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
    <Root className={styles.AboutMeSection}>
      <div className={styles.backgroundView} />
      <IntroductionSection ref={introductionRef} />
      <TechnologiesSection ref={technologiesRef} />
    </Root>
  );
});

export default AboutMeSection;
