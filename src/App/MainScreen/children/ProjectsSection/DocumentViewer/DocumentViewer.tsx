import { BubbleIconButton } from '@/helper-views/BubbleIconButton/BubbleIconButton';
import colors from '@/helpers/_colors.module.scss';
import { twClassNames } from '@/helpers/general/twClassNames';
import { useDisableBodyScroll } from '@/helpers/hooks/useDisableBodyScroll';
import { Transition } from '@headlessui/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FocusTrap from 'focus-trap-react';
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { extend } from 'react-extend-components';
import { DocumentViewerHeader } from './DocumentViewerHeader';
import { IframeViewer } from './IframeViewer';
import { ImageViewer } from './ImageViewer';
import { DocumentViewerCollection, DocumentViewerItem } from './helpers';

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

  useEffect(() => {
    function listener(e: KeyboardEvent): void {
      if (e.key === 'Escape') setIsOpen(false);
    }
    window.addEventListener('keyup', listener);
    return () => window.removeEventListener('keyup', listener);
  }, []);

  const nextItem = useMemo(() => {
    if (currentItem == null) return null;
    return collection?.getNextItem?.(currentItem) ?? null;
  }, [collection, currentItem]);

  const previousItem = useMemo(() => {
    if (currentItem == null) return null;
    return collection?.getPreviousItem?.(currentItem) ?? null;
  }, [collection, currentItem]);

  return createPortal(
    <Root className="fixed inset-0 z-[100] " as="div" show={isOpen}>
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
                as={DocumentViewerHeader}
                title={currentItem.title}
                buttons={currentItem.headerButtons}
                hide={() => {
                  hide();
                }}
                className="pointer-events-auto transition-[transform_opacity] duration-300 "
                enterFrom="translate-y-[-50px] opacity-0"
                enterTo="translate-y-0 opacity-100"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="translate-y-[-50px] opacity-0"
              />
            )}
            <div className="relative flex flex-1 flex-row items-center px-[10px] pb-[10px] sm:px-[20px] sm:pb-[20px] gap-[10px] sm:gap-[20px]">
              <ArrowButton
                type="left"
                buttonProps={{
                  className: twClassNames({
                    'pointer-events-none opacity-30': previousItem == null,
                  }),
                  onClick: () => setCurrentItem(previousItem),
                }}
              />

              <Transition.Child
                className={twClassNames(
                  'flex-1 self-stretch transition-[transform_opacity] duration-300',
                )}
                enterFrom="scale-75 translate-y-0 opacity-0"
                enterTo="scale-100 translate-y-0 opacity-100"
                leaveFrom="scale-100 translate-y-0 opacity-100"
                leaveTo="scale-75 translate-y-0 opacity-0"
              >
                {(() => {
                  if (currentItem == null) return null;
                  switch (currentItem?.data.type) {
                    case 'image':
                      return (
                        <ImageViewer
                          className=""
                          src={currentItem.data.imageUrl}
                        />
                      );
                    case 'website-demo':
                      return (
                        <IframeViewer
                          className=""
                          src={currentItem.data.websiteUrl}
                        />
                      );
                    case 'pdf-file':
                      return (
                        <IframeViewer
                          className=""
                          src={currentItem.data.fileUrl}
                        />
                      );
                    default:
                      return null;
                  }
                })()}
              </Transition.Child>
              <ArrowButton
                type="right"
                buttonProps={{
                  className: twClassNames({
                    'pointer-events-none opacity-30': nextItem == null,
                  }),
                  onClick: () => setCurrentItem(nextItem),
                }}
              />
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
