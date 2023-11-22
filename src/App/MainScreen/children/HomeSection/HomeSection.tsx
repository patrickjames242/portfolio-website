import { BubbleTextAnchor } from 'helper-views/BubbleTextButton/BubbleTextButton';
import SlideUpSentence, {
  Alignment,
  SlideUpSentenceRef,
} from 'helper-views/SlideUpSentence/SlideUpSentence';
import { usePresentationController } from 'helpers/AnimationController';
import { useCallbackRef } from 'helpers/hooks';
import { addStarEffectToCanvas } from 'helpers/starsBackgoundEffect/starsBackgroundEffect';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import {
  RouteType,
  getInfoForRouteType,
  useRouteTypeNavigation,
} from '../NavViews/helpers';
import styles from './HomeSection.module.scss';

export interface HomeSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const HomeSection: React.ForwardRefRenderFunction<
  HTMLDivElement,
  HomeSectionProps
> = (props, forwardedRef) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigateToRouteType = useRouteTypeNavigation();

  const rootRef = useCallbackRef(forwardedRef);

  const titleSentenceRef = useRef<SlideUpSentenceRef>(null);
  const subtitleSentenceRef = useRef<SlideUpSentenceRef>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const getInTouchButtonHolderRef = useRef<HTMLDivElement>(null);

  const presentationController = usePresentationController();

  useEffect(() => {
    presentationController.addSection({
      sectionRoot: rootRef.getLatest()!,
      presentationItems: [
        () => {
          titleSentenceRef.current?.animate();
          return { secondsTillNextAnimation: 0.44 };
        },
        () => {
          subtitleSentenceRef.current?.animate();
          return { secondsTillNextAnimation: 0.68 };
        },
        { slideUpElement: descriptionRef.current! },
        { slideUpElement: getInTouchButtonHolderRef.current! },
      ],
    });
  }, [presentationController, rootRef]);

  useLayoutEffect(() => {
    addStarEffectToCanvas(canvasRef.current!);
  }, []);

  return (
    <div
      {...props}
      ref={rootRef}
      className={[styles.HomeSection, props.className].asClassString()}
    >
      <canvas ref={canvasRef} className={styles.starsCanvas}></canvas>
      <div className={styles.centerView}>
        <h1 className={styles.titleText}>
          <SlideUpSentence
            ref={titleSentenceRef}
            alignment={Alignment.left}
            slideUpImmediately={false}
          >
            {[
              'Hey,',
              "I'm",
              <span key="0" className={styles.highlighted}>
                Patrick
              </span>,
              <React.Fragment key="1">
                <span className={styles.highlighted}>Hanna</span>.
              </React.Fragment>,
            ]}
          </SlideUpSentence>
        </h1>
        <h2 className={styles.subtitleText}>
          <SlideUpSentence
            ref={subtitleSentenceRef}
            alignment={Alignment.left}
            slideUpImmediately={false}
          >
            I Build Cool Apps and Websites.
          </SlideUpSentence>
        </h2>
        <p ref={descriptionRef} className={styles.descriptionText}>
          {
            "I'm a software developer with a focus on front-end and back-end web development, cross platform app development, and native iOS development."
          }
        </p>
        <div
          ref={getInTouchButtonHolderRef}
          className={styles.getInTouchButtonHolder}
        >
          <BubbleTextAnchor
            titleText="Get in touch"
            className={[styles.getInTouchButton].asClassString()}
            href={getInfoForRouteType(RouteType.contactMe).path}
            onClick={(event) => {
              event.preventDefault();
              navigateToRouteType(RouteType.contactMe);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(HomeSection);
