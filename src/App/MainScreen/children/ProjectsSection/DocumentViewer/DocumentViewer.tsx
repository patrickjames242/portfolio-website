/* eslint-disable max-lines */
import { BubbleIconButton } from '@/helper-views/BubbleIconButton/BubbleIconButton';
import colors from '@/helpers/_colors.module.scss';
import { twClassNames } from '@/helpers/general/twClassNames';
import { useDisableBodyScroll } from '@/helpers/hooks/useDisableBodyScroll';
import { useElementSizeWithTransform } from '@/helpers/hooks/useElementSizeWithTransform';
import { Transition } from '@headlessui/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FocusTrap from 'focus-trap-react';
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { extend } from 'react-extend-components';
import { map } from 'rxjs';
import { DocumentViewerHeader } from './DocumentViewerHeader';
import { IframeViewer } from './IframeViewer';
import { ImageViewer } from './ImageViewer';
import { DocumentViewerCollection, DocumentViewerItem } from './helpers';
import { useTransitionToNextView } from './useTransitionToNextView';

export interface DocumentViewerRef {
  show: (collection: DocumentViewerCollection) => void;
  hide: () => void;
}
export const DocumentViewer = extend(Transition<'div'>)<{}, DocumentViewerRef>((
  Root,
  { ref },
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [collection, setCollection] = useState<DocumentViewerCollection | null>(
    null,
  );
  const [currentItem, setCurrentItem] = useState<DocumentViewerItem | null>(
    null,
  );

  const [rootSizeRef, shouldShowForwardBackButtonsOnSide] =
    useElementSizeWithTransform(
      useCallback((size$) => size$.pipe(map((x) => x.width >= 700)), []),
      { defaultValue: true, sendInitialSizeImmediately: false },
    );

  const hide = useCallback(() => {
    setIsOpen(false);
  }, []);

  useDisableBodyScroll(isOpen);

  useImperativeHandle(
    ref,
    () => ({
      show: (collection) => {
        setCollection(collection);
        setCurrentItem(collection.initialItem);
        setIsOpen(true);
      },
      hide,
    }),
    [hide],
  );

  const nextItem = useMemo(() => {
    if (currentItem == null) return null;
    return collection?.getNextItem?.(currentItem) ?? null;
  }, [collection, currentItem]);

  const previousItem = useMemo(() => {
    if (currentItem == null) return null;
    return collection?.getPreviousItem?.(currentItem) ?? null;
  }, [collection, currentItem]);

  useEffect(() => {
    function listener(e: KeyboardEvent): void {
      switch (e.key) {
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowLeft':
          if (previousItem) setCurrentItem(previousItem);
          break;
        case 'ArrowRight':
          if (nextItem) setCurrentItem(nextItem);
          break;
      }
    }
    window.addEventListener('keyup', listener);
    return () => window.removeEventListener('keyup', listener);
  }, [nextItem, previousItem]);

  const previousButton = collection?.getPreviousItem && (
    <ArrowButton
      type="left"
      buttonProps={{
        className: twClassNames({
          'pointer-events-none opacity-30': previousItem == null,
          'rounded-[15px] !w-full !block': !shouldShowForwardBackButtonsOnSide,
        }),
        onClick: () => setCurrentItem(previousItem),
      }}
    />
  );

  const nextButton = collection?.getNextItem && (
    <ArrowButton
      type="right"
      buttonProps={{
        className: twClassNames({
          'pointer-events-none opacity-30': nextItem == null,
          'rounded-[15px] !w-full !block': !shouldShowForwardBackButtonsOnSide,
        }),
        onClick: () => setCurrentItem(nextItem),
      }}
    />
  );

  const { transition, content: transitionContent } =
    useTransitionToNextView<DocumentViewerItem>({
      initialItem: currentItem,
      RenderFn: useCallback(({ item, isShown, isFinishedExiting }) => {
        return (
          <Transition
            show={isShown}
            appear
            className={twClassNames(
              'absolute inset-0 transition-[transform,_opacity] duration-300',
            )}
            enterFrom="scale-75 translate-y-0 opacity-0"
            enterTo="scale-100 translate-y-0 opacity-100"
            leaveFrom="scale-100 translate-y-0 opacity-100"
            leaveTo="scale-75 translate-y-0 opacity-0"
            afterLeave={isFinishedExiting}
          >
            {(() => {
              switch (item.data.type) {
                case 'image':
                  return <ImageViewer className="" src={item.data.imageUrl} />;
                case 'website-demo':
                  return (
                    <IframeViewer className="" src={item.data.websiteUrl} />
                  );
                case 'pdf-file':
                  return <IframeViewer className="" src={item.data.fileUrl} />;
                default:
                  return null;
              }
            })()}
          </Transition>
        );
      }, []),
    });

  useLayoutEffect(() => {
    if (isOpen) {
      transition(currentItem);
    } else {
      transition(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentItem, isOpen]);

  return createPortal(
    <Root
      className="fixed inset-0 z-[100] "
      as="div"
      show={isOpen}
      ref={rootSizeRef}
    >
      <FocusTrap focusTrapOptions={{ initialFocus: false }}>
        <div className="flex flex-col s-full ">
          <Transition.Child
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-[opacity] duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            onClick={() => {
              setIsOpen(false);
            }}
          />
          <div className="pointer-events-none relative flex h-full flex-col">
            {currentItem && (
              <Transition.Child
                as="div"
                className="transition-[transform,_opacity] duration-300 "
                enterFrom="translate-y-[-50px] opacity-0"
                enterTo="translate-y-0 opacity-100"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="translate-y-[-50px] opacity-0"
              >
                <DocumentViewerHeader
                  title={currentItem.title}
                  buttons={currentItem.headerButtons}
                  hide={() => {
                    hide();
                  }}
                />
              </Transition.Child>
            )}
            <div
              className={twClassNames(
                'relative flex flex-1  px-[10px] pb-[10px] sm:px-[20px] sm:pb-[20px] gap-[10px] sm:gap-[20px]',
                {
                  'flex-row items-center': shouldShowForwardBackButtonsOnSide,
                  'flex-col items-stretch': !shouldShowForwardBackButtonsOnSide,
                },
              )}
            >
              {shouldShowForwardBackButtonsOnSide && previousButton}
              <div
                className="relative flex-1 self-stretch mx-auto w-full"
                style={{ maxWidth: currentItem?.viewerMaxWidth }}
              >
                {transitionContent}
              </div>
              {shouldShowForwardBackButtonsOnSide && nextButton}
              {!shouldShowForwardBackButtonsOnSide &&
                (nextButton || previousButton) && (
                  <div className="flex flex-row gap-[10px] pb-[env(safe-area-inset-bottom)]">
                    <div className="flex-1">{previousButton}</div>
                    <div className="flex-1">{nextButton}</div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </FocusTrap>
    </Root>,
    window.document.body,
  );
});

const ArrowButton = extend(Transition.Child<'div'>, {
  Button: BubbleIconButton,
})<{
  type: 'left' | 'right';
}>((Root, { Button }, { type }) => {
  return (
    <Root
      as="div"
      className={twClassNames(
        'rounded-full transition-[opacity_transform] duration-300 pointer-events-auto',
        {
          'left-[20px]': type === 'left',
          'right-[20px]': type === 'right',
        },
      )}
      enterFrom={twClassNames('opacity-0 ', {
        'translate-x-[-30px]': type === 'left',
        'translate-x-[30px]': type === 'right',
      })}
      enterTo="opacity-100 translate-x-0"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo={twClassNames('opacity-0 ', {
        'translate-x-[-30px]': type === 'left',
        'translate-x-[30px]': type === 'right',
      })}
    >
      <Button
        className={twClassNames('bg-accent')}
        Icon={type === 'left' ? ArrowBackIcon : ArrowForwardIcon}
        bubbleColor="white"
        iconColor="white"
        hoverIconColor={colors.accent}
      ></Button>
    </Root>
  );
});
