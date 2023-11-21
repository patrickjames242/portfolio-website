import SectionHeader from 'helper-views/SectionHeader/SectionHeader';
import {
  PresentationSection,
  usePresentationController,
} from 'helpers/AnimationController';
import { clampNum } from 'helpers/general';
import { useCallbackRef, useMediaQuery } from 'helpers/hooks';
import { technologiesList } from 'helpers/technologies/technologies';
import React, {
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';
import ReactDOM from 'react-dom';
import { filter } from 'rxjs';
import styles from './AboutMeSection.module.scss';
import patrickImage from './patrick-image.jpg';

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

interface IntroductionSectionRef {
  getPresentationSection(): PresentationSection;
}

interface IntroductionSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {}
const IntroductionSection = (() => {
  const IntroductionSection: React.ForwardRefRenderFunction<
    IntroductionSectionRef,
    IntroductionSectionProps
  > = ({ ...htmlAttributes }, ref) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const sectionHeaderRef = useRef<HTMLDivElement>(null);
    const paragraphRefs = useRef(
      [1, 2, 3].map(() => React.createRef<HTMLParagraphElement>()),
    ).current;
    const imageHolderRef = useCallbackRef<HTMLDivElement>();
    const imageRef = useCallbackRef<HTMLImageElement>();

    useImperativeHandle(
      ref,
      () => ({
        getPresentationSection() {
          return {
            sectionRoot: rootRef.current!,
            threshold: 0.05,
            presentationItems: [
              {
                animateAtOnce: [
                  { slideUpElement: sectionHeaderRef.current! },
                  { slideUpElement: imageHolderRef.getLatest()! },
                ],
              },
              ...paragraphRefs.map((ref) => ({ slideUpElement: ref.current! })),
            ],
          };
        },
      }),
      [imageHolderRef, paragraphRefs],
    );

    useLayoutEffect(() => {
      const resizeObservableListener = () => {
        const imageLatest = imageRef.getLatest(),
          imageHolderLatest = imageHolderRef.getLatest();
        if (imageLatest == null || imageHolderLatest == null) return;
        const inset =
          clampNum(imageLatest.clientWidth * 0.1, { min: 13, max: 25 }) + 'px';
        imageHolderLatest?.style.setProperty('--inset', inset);
      };
      resizeObservableListener();
      const resizeObserver = new ResizeObserver(resizeObservableListener);
      const imageRefSubscription = imageRef.latest$
        .pipe(filter((x) => x != null))
        .subscribe((image) => {
          resizeObserver.observe(image!);
        });
      return () => {
        imageRefSubscription.unsubscribe();
        resizeObserver.disconnect();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sectionHeaderHolder = useRef<HTMLDivElement>(
      (() => {
        const div = document.createElement('div');
        div.classList.toggle(styles.sectionHeaderHolder, true);
        return div;
      })(),
    ).current;

    useMediaQuery(
      `(max-width: ${styles.imageLinedUpWithDescriptionMaxWidth})`,
      (matches) => {
        const showHeaderAboveColumns = matches;
        if (showHeaderAboveColumns) {
          rootRef.current?.insertAdjacentElement(
            'afterbegin',
            sectionHeaderHolder,
          );
        } else {
          paragraphRefs[0].current?.insertAdjacentElement(
            'beforebegin',
            sectionHeaderHolder,
          );
        }
      },
      [],
    );

    return (
      <>
        {ReactDOM.createPortal(
          <SectionHeader
            ref={sectionHeaderRef}
            titleText="A Little About Me"
            includeLine={false}
            className={[styles.SectionHeader].asClassString()}
          />,
          sectionHeaderHolder,
        )}
        <div
          {...htmlAttributes}
          className={[
            styles.IntroductionSection,
            htmlAttributes.className,
          ].asClassString()}
          ref={rootRef}
        >
          {/* where section header is inserted */}
          <div className={styles.content}>
            <div className={styles.leftSide}>
              {/* where section header is inserted */}
              <p ref={paragraphRefs[0]}>
                👋 Hi! I'm Patrick, a software developer currently living in{' '}
                <a
                  className="underline-on-hover"
                  href="https://www.google.com/maps/place/Nassau/@25.0324949,-77.5471788,11z/data=!3m1!4b1!4m5!3m4!1s0x892f7c99b981dbc9:0x2aef01d3485e50d2!8m2!3d25.0443312!4d-77.3503609"
                  target="_blank"
                  rel="noreferrer"
                >
                  Nassau, Bahamas.
                </a>{' '}
                I specialize in producing high quality apps and websites that
                look great and are a joy to use.
              </p>
              <p ref={paragraphRefs[1]}>
                👨‍💻 I started programming when I came across the{' '}
                <a
                  className="underline-on-hover"
                  href="https://www.apple.com/swift/playgrounds/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Swift Playgrounds
                </a>{' '}
                iPad game, and immediately I was hooked! Soon after, I became
                quite the avid iOS Developer, writing native iPhone and iPad
                apps using{' '}
                <a
                  className="underline-on-hover"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.apple.com/swift/"
                >
                  Swift
                </a>{' '}
                and{' '}
                <a
                  className="underline-on-hover"
                  target="_blank"
                  rel="noreferrer"
                  href="https://developer.apple.com/xcode/"
                >
                  Xcode.
                </a>{' '}
                From there, I transitioned into building full-stack web
                applications.
              </p>
              <p ref={paragraphRefs[2]}>
                👨‍🎓 Additionally, I'm a graduate of{' '}
                <a
                  className="underline-on-hover"
                  target="_blank"
                  rel="noreferrer"
                  href="https://ub.edu.bs/"
                >
                  The University of The Bahamas
                </a>{' '}
                where I earned a Bachelors degree in Computer Information
                Systems.
              </p>
            </div>
            <div
              ref={imageHolderRef}
              className={[styles.imageHolder].asClassString()}
            >
              <div className={styles.border} />

              <img ref={imageRef} src={patrickImage} alt="Patrick" />
            </div>
          </div>
        </div>
      </>
    );
  };

  return React.forwardRef(IntroductionSection);
})();

interface TechnologiesSectionRef {
  getPresentationSection(): PresentationSection;
}

interface TechnologiesSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {}
const TechnologiesSection = (() => {
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
