import { BubbleIconButton } from '@/helper-views/BubbleIconButton/BubbleIconButton';
import colors from '@/helpers/_colors.module.scss';
import { twClassNames } from '@/helpers/general/twClassNames';
import { Transition } from '@headlessui/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FocusTrap from 'focus-trap-react';
import { useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { createPortal } from 'react-dom';
import { extend } from 'react-extend-components';
import { DocumentViewerHeader } from './DocumentViewerHeader';
import { ImageViewer } from './ImageViewer';

export interface DocumentViewerRef {
  show: (imageUrl: string) => void;
  hide: () => void;
}
export const DocumentViewer = extend(Transition<'div'>)<{}, DocumentViewerRef>((
  Root,
  { ref },
) => {
  const [isOpen, setIsOpen] = useState(false);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const hide = useCallback(() => {
    setIsOpen(false);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      show: (imageUrl) => {
        setImageUrl(imageUrl);
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
            <Transition.Child
              as={DocumentViewerHeader}
              title={'Blah'}
              hide={() => {
                hide();
              }}
              className="pointer-events-auto transition-[transform_opacity] duration-300"
              enterFrom="translate-y-[-50px] opacity-0"
              enterTo="translate-y-0 opacity-100"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="translate-y-[-50px] opacity-0"
            />
            <div className="relative flex flex-1 flex-col  items-center p-[10px] sm:p-[50px]">
              <ArrowButton type="left" />
              <ArrowButton type="right" />
              <Transition.Child
                className={twClassNames(
                  'w-full max-w-[1000px] flex-1 transition-[transform_opacity] duration-300',
                )}
                enterFrom="scale-75 translate-y-0 opacity-0"
                enterTo="scale-100 translate-y-0 opacity-100"
                leaveFrom="scale-100 translate-y-0 opacity-100"
                leaveTo="scale-75 translate-y-0 opacity-0"
              >
                {(() => {
                  if (imageUrl == null) return null;
                  return <ImageViewer src={imageUrl} />;
                })()}
              </Transition.Child>
            </div>
          </div>
        </div>
      </FocusTrap>
    </Root>,
    window.document.body,
  );
});

const ArrowButton = extend(Transition.Child<'div'>)<{
  type: 'left' | 'right';
}>((Root, { type }) => {
  return (
    <Root
      as="div"
      className={twClassNames(
        'absolute top-[50%] z-[3] translate-y-[-50%] rounded-full  transition-[opacity_transform] duration-300',
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
      <BubbleIconButton
        className={twClassNames('pointer-events-auto bg-accent')}
        Icon={type === 'left' ? ArrowBackIcon : ArrowForwardIcon}
        bubbleColor="white"
        iconColor="white"
        hoverIconColor={colors.accent}
      ></BubbleIconButton>
    </Root>
  );
});
