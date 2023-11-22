import { twClassNames } from '@/helpers/general/twClassNames';
import { BubbleTextAnchor } from 'helper-views/BubbleTextButton/BubbleTextButton';
import SlideUpSentence, {
  Alignment,
  SlideUpSentenceRef,
} from 'helper-views/SlideUpSentence/SlideUpSentence';
import { usePresentationController } from 'helpers/AnimationController';
import { addStarEffectToCanvas } from 'helpers/starsBackgoundEffect/starsBackgroundEffect';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { extend } from 'react-extend-components';
import {
  RouteType,
  getInfoForRouteType,
  useRouteTypeNavigation,
} from '../NavViews/helpers';

export interface HomeSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const HomeSection = extend('div')((Root) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigateToRouteType = useRouteTypeNavigation();

  const rootRef = useRef<HTMLDivElement>(null);

  const titleSentenceRef = useRef<SlideUpSentenceRef>(null);
  const subtitleSentenceRef = useRef<SlideUpSentenceRef>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const getInTouchButtonHolderRef = useRef<HTMLDivElement>(null);

  const presentationController = usePresentationController();

  useEffect(() => {
    presentationController.addSection({
      sectionRoot: rootRef.current!,
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
    <Root
      ref={rootRef}
      className={twClassNames(
        'grid box-border relative pointer-events-none',
        'min-h-[calc(100vh_-_var(--expanded-nav-bar-height))]',
      )}
    >
      <canvas
        ref={canvasRef}
        className={twClassNames(
          'absolute w-[100vw] left-[50%] translate-x-[-50%] pointer-events-auto',
          'h-[calc(100%_+_var(--expanded-nav-bar-height))]',
          'top-[calc(var(--expanded-nav-bar-height)_*_-1)]',
        )}
      ></canvas>
      <div className="my-[30px] max-w-[1000px] place-self-center pointer-events-none">
        <h1 className="text-light-text text-[clamp(45px,_8vw,_70px)] font-semibold leading-[1]">
          <SlideUpSentence
            ref={titleSentenceRef}
            alignment={Alignment.left}
            slideUpImmediately={false}
          >
            {[
              'Hey,',
              "I'm",
              <span key="0" className="text-accent">
                Patrick
              </span>,
              <React.Fragment key="1">
                <span className="text-accent">Hanna</span>.
              </React.Fragment>,
            ]}
          </SlideUpSentence>
        </h1>
        <h2 className="text-lighter-text mt-[13px] text-[clamp(45px,_8vw,_70px)] font-semibold leading-[1]">
          <SlideUpSentence
            ref={subtitleSentenceRef}
            alignment={Alignment.left}
            slideUpImmediately={false}
          >
            {"I'm an experienced software developer."}
          </SlideUpSentence>
        </h2>
        <p
          ref={descriptionRef}
          className="mt-[20px] text-[20px] text-lighter-text max-w-[500px] leading-[26px] font-light"
        >
          {
            "I'm a software developer with a focus on front-end and back-end web development, cross platform app development, and native iOS development."
          }
        </p>
        <div ref={getInTouchButtonHolderRef} className="mt-[30px]">
          <BubbleTextAnchor
            titleText="Get in touch"
            href={getInfoForRouteType(RouteType.contactMe).path}
            onClick={(event) => {
              event.preventDefault();
              navigateToRouteType(RouteType.contactMe);
            }}
          />
        </div>
      </div>
    </Root>
  );
});

export default HomeSection;
