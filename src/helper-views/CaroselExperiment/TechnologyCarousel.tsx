/* eslint-disable max-lines */
import { useBehaviorSubject } from '@/helpers/hooks/useBehaviorSubject';
import { useElementSize } from '@/helpers/hooks/useElementSize';
import { useElementSize$ } from '@/helpers/hooks/useElementSize$';
import { ReactNode, RefObject, useEffect, useMemo, useRef } from 'react';
import {
  ExtendedComponent,
  ExtendedComponentProps,
  extend,
} from 'react-extend-components';
import { Observable, combineLatest, map } from 'rxjs';

// const technologies: TechnologyItem[] = getNumberList(0, 20).map(() => ({}));

interface CarouselView {
  <ItemT extends object>(
    props: ExtendedComponentProps<
      'div',
      {
        keyGetter: (item: ItemT) => string;
        renderItem: (item: ItemT) => JSX.Element;
        items: ItemT[];
      }
    >,
  ): ReactNode;
}

export const CarouselView: CarouselView = extend('div')((
  Div,
  { renderItem, items, keyGetter },
) => {
  const [rootSizeRef, rootSize$] = useElementSize$();
  const scrollXPosition = useBehaviorSubject<number>(0);

  const scrollableWindowWidth$ = useMemo(() => {
    return rootSize$.pipe(
      map((rootSize) => {
        return rootSize.width;
      }),
    );
  }, [rootSize$]);

  const scrollX$ = useMemo(() => {
    return scrollXPosition.asObservable();
  }, [scrollXPosition]);

  const [positionItemsContainerRef, positionItemsContainerSize] =
    useElementSize();

  const technologyItems = new Map<
    string,
    ReturnType<typeof useTechnologyItemViewsPair>
  >(
    items.map((x, i) => [
      keyGetter(x),
      useTechnologyItemViewsPair(
        x,
        renderItem,
        scrollableWindowWidth$,
        scrollX$,
        i,
        items,
      ),
    ]),
  );

  return (
    <Div
      ref={rootSizeRef}
      className="overflow-x-scroll pb-[10px]"
      onScroll={(e) => {
        scrollXPosition.next((e.target as HTMLDivElement).scrollLeft);
      }}
    >
      <div ref={positionItemsContainerRef} className="flex-row flex gap-[10px]">
        {items.map((x, i) => {
          const PositionObserver = technologyItems.get(
            keyGetter(x),
          )!.PositionItem;
          return <PositionObserver key={i} />;
        })}
      </div>
      <div
        className="z-[100] left-0 sticky"
        style={{
          width: positionItemsContainerSize.width,
          height: positionItemsContainerSize.height,
          marginTop: -positionItemsContainerSize.height,
        }}
      >
        {items.map((x, i) => {
          const Displayer = technologyItems.get(keyGetter(x))!.Displayer;
          return <Displayer key={i} />;
        })}
      </div>
    </Div>
  );
});

function useTechnologyItemViewsPair(
  item: any,
  renderItem: (item: any) => JSX.Element,
  scrollableWindowWidth$: Observable<number>,
  scrollX$: Observable<number>,
  itemIndex: number,
  allItems: any[],
): {
  PositionItem: ExtendedComponent<'div'>;
  Displayer: ExtendedComponent<typeof TechnologyItemDisplayer>;
} {
  const divBeingObserved = useRef<HTMLDivElement>(null);

  const PositionItem = useMemo(() => {
    return extend('div')((Root) => {
      return (
        <Root ref={divBeingObserved} className="opacity-0 pointer-events-none">
          {renderItem(item)}
        </Root>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Displayer = useMemo(() => {
    return extend(TechnologyItemDisplayer)((Root) => {
      return (
        <Root
          divBeingObserved={divBeingObserved}
          scrollX$={scrollX$}
          scrollableWindowWidth$={scrollableWindowWidth$}
          itemIndex={itemIndex}
          allItems={allItems}
        >
          {renderItem(item)}
        </Root>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(() => {
    return {
      PositionItem,
      Displayer,
    };
  }, [Displayer, PositionItem]);
}

const TechnologyItemDisplayer = extend('div')<{
  divBeingObserved: RefObject<HTMLDivElement>;
  scrollableWindowWidth$: Observable<number>;
  scrollX$: Observable<number>;
  itemIndex: number;
  children?: ReactNode;
  allItems: any[];
}>((
  Root,
  {
    scrollableWindowWidth$,
    scrollX$,
    divBeingObserved: divBeingObservedRef,
    itemIndex,
    children,
    allItems,
  },
) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef.current == null) return undefined;

    const sub = combineLatest({
      scrollX: scrollX$,
      scrollableWidth: scrollableWindowWidth$,
      scrollableWindowWidth: scrollableWindowWidth$,
    }).subscribe(({ scrollX, scrollableWidth, scrollableWindowWidth }) => {
      const divBeingObserved = divBeingObservedRef.current;
      if (divBeingObserved == null) return;

      const exitDistance = (() => {
        const rootOffsetX = divBeingObserved.offsetLeft;
        const xPositionInScrollWindow = rootOffsetX - scrollX;

        if (xPositionInScrollWindow < 0) {
          return xPositionInScrollWindow;
        } else {
          const rightEdgeOfRoot = rootOffsetX + divBeingObserved.offsetWidth;
          const rightEdgeOfScrollWindow = scrollX + scrollableWidth;
          const rightExitValue = rightEdgeOfRoot - rightEdgeOfScrollWindow;
          if (rightExitValue > 0) {
            return rightExitValue;
          }
        }
        return 0;
      })();

      const position = {
        x: divBeingObserved.offsetLeft - scrollX,
        y: divBeingObserved.offsetTop,
        width: divBeingObserved.offsetWidth,
        height: divBeingObserved.offsetHeight,
        exitDistance,
      };

      const minXForLeft = 0;
      const maxXForRight = scrollableWindowWidth - position.width;

      const xValue = Math.min(Math.max(position.x, minXForLeft), maxXForRight);
      const itemIsOnLeftSide =
        xValue + position.width / 2 <= scrollableWindowWidth / 2;

      const opacity =
        1 - Math.max(Math.min(Math.abs(exitDistance) / 500, 1), 0);

      const scale = 1 - Math.max(Math.min(Math.abs(exitDistance) / 2000, 1), 0);

      rootRef.current!.style.left = `${xValue}px`;
      rootRef.current!.style.top = `${position.y}px`;
      rootRef.current!.style.width = `${position.width}px`;
      rootRef.current!.style.height = `${position.height}px`;
      rootRef.current!.style.opacity = opacity + '';
      rootRef.current!.style.transform = `scale(${scale})`;
      if (itemIsOnLeftSide) {
        rootRef.current!.style.zIndex = `${itemIndex + 1}`;
      } else {
        rootRef.current!.style.zIndex = `${allItems.length - itemIndex}`;
      }
    });

    return () => sub.unsubscribe();
  }, [
    allItems.length,
    divBeingObservedRef,
    itemIndex,
    scrollX$,
    scrollableWindowWidth$,
  ]);

  return (
    <Root ref={rootRef} className="absolute">
      {children}
    </Root>
  );
});
