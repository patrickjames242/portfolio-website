import { useCallback, useMemo } from 'react';
import {
  AnimationStack,
  getAnimationStack,
  mapOptional,
  numberSort,
} from './general/general';
import { useUnmounted } from './hooks';
import { animateSlideUpElement } from './slide-up-animation/slide-up-animation';

type Presentation =
  | (() => { secondsTillNextAnimation: number } | null | undefined | void)
  | { slideUpElement: HTMLElement; secondsTillNextAnimation?: number };
export type PresentationItem = Presentation | { animateAtOnce: Presentation[] };

export interface PresentationSection {
  sectionRoot?: HTMLElement;
  threshold?: number;
  presentationItems: (PresentationItem | { subsection: PresentationSection })[];
}

export interface PresentationController {
  addSection(section: PresentationSection): void;
}

export function usePresentationController(): PresentationController {
  const unmounted$ = useUnmounted();
  const addSection = useCallback((section: PresentationSection) => {
    const animationStack = getAnimationStack(300);
    const observerOrder = new Map<IntersectionObserver, number>();
    let sectionBuffer: {
      section: PresentationSection;
      observer: IntersectionObserver;
    }[] = [];
    let timeout: number | null = null;

    function emptySectionBuffer(): void {
      sectionBuffer
        .sort(numberSort((x) => observerOrder.get(x.observer)!))
        .forEach(({ section }) => {
          animateSection(section, animationStack);
        });
      sectionBuffer = [];
    }

    (function addObserverForSection(section: PresentationSection) {
      if (section.sectionRoot != null) {
        const observer = new IntersectionObserver(
          ([entry], observer) => {
            if (entry.isIntersecting === false) return;
            observer.disconnect();
            sectionBuffer.push({ section, observer });
            timeout && clearTimeout(timeout);
            timeout = setTimeout(() => emptySectionBuffer(), 0) as any;
          },
          { threshold: section.threshold },
        );
        observerOrder.set(observer, observerOrder.size);
        observer.observe(section.sectionRoot);
        unmounted$.subscribe(() => observer.disconnect());
      }
      for (const presentationItem of section.presentationItems) {
        if ('subsection' in presentationItem) {
          addObserverForSection(presentationItem.subsection);
          continue;
        }
        preparePresentationItemSlideUpElements(presentationItem);
      }
    })(section);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(() => ({ addSection }), [addSection]);
}

function preparePresentationItemSlideUpElements(
  presentationItem: PresentationItem,
): void {
  if ('slideUpElement' in presentationItem) {
    presentationItem.slideUpElement.classList.toggle('slide-up-element', true);
  } else if ('animateAtOnce' in presentationItem) {
    for (const item of presentationItem.animateAtOnce) {
      preparePresentationItemSlideUpElements(item);
    }
  }
}

function animatePresentationItem(
  presentationItem: PresentationItem,
): { secondsTillNextAnimation: number } | null | undefined | void {
  if (typeof presentationItem === 'function') {
    return presentationItem();
  } else if ('slideUpElement' in presentationItem) {
    const animationLengthSeconds = animateSlideUpElement(
      presentationItem.slideUpElement,
    ).animationLengthSeconds;
    return {
      secondsTillNextAnimation:
        presentationItem.secondsTillNextAnimation ??
        animationLengthSeconds * 0.4,
    };
  } else if ('animateAtOnce' in presentationItem) {
    let animationLength: number | null = null;
    for (const presentation of presentationItem.animateAtOnce) {
      const duration =
        animatePresentationItem(presentation)?.secondsTillNextAnimation;
      if (duration != null)
        animationLength = Math.max(animationLength ?? 0, duration);
    }
    return mapOptional(animationLength, (x) => ({
      secondsTillNextAnimation: x,
    }));
  }
  return undefined;
}

function animateSection(
  section: PresentationSection,
  animationStack: AnimationStack,
): void {
  animationStack.addElementsToAnimationStack(
    section.presentationItems.compactMap((presentationItem) => {
      if ('subsection' in presentationItem) return null;
      return () => {
        return animatePresentationItem(presentationItem);
      };
    }),
  );
}
