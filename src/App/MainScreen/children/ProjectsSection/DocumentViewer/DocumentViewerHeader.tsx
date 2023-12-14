import { BubbleIconButton } from '@/helper-views/BubbleIconButton/BubbleIconButton';
import { downloadFile } from '@/helpers/general/downloadFile';
import { twClassNames } from '@/helpers/general/twClassNames';
import { useAsObservable } from '@/helpers/hooks/useAsObservable';
import { useElementSize$ } from '@/helpers/hooks/useElementSize$';
import { useObservableValue } from '@/helpers/hooks/useObservableValue';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from '@mui/material/Tooltip';
import {
  CSSProperties,
  ComponentType,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { extend, mergeRefs } from 'react-extend-components';
import { combineLatest, distinctUntilChanged, map } from 'rxjs';

export type DocumentViewerHeaderButton = {
  title: string;
  Icon: ComponentType<{ className?: string; style?: CSSProperties }>;
} & (
  | { href: string }
  | { onClick: () => void }
  | { downloadUrl: string; fileName?: string }
);

export const DocumentViewerHeader = extend('div')<{
  hide: () => void;
  title?: string;
  buttons?: DocumentViewerHeaderButton[];
}>((Div, { hide, title, buttons }) => {
  const [rootSizeRef, rootSize$] = useElementSize$({
    sendInitialSizeImmediately: false,
  });
  const rootRef = useRef<HTMLDivElement>(null);

  const buttons$ = useAsObservable(buttons);

  const shouldBeTwoRows$ = useMemo(() => {
    return combineLatest({
      rootSize: rootSize$,
      buttons: buttons$,
    }).pipe(
      map(({ rootSize, buttons }) => {
        if (buttons == null) return false;

        const BUTTON_LENGTH = 50;
        const BUTTON_SPACING = 5;

        const totalButtonBoxLength =
          buttons.length * BUTTON_LENGTH +
          (buttons.length - 1) * BUTTON_SPACING;

        return totalButtonBoxLength / (rootSize.width - 200) > 0.7;
      }),
      distinctUntilChanged(),
    );
  }, [buttons$, rootSize$]);

  const shouldBeTwoRows = useObservableValue(shouldBeTwoRows$, false);

  useEffect(() => {
    // this is a hack to force the root element to re-paint so that the
    // position of the header on ios is not messed up
    rootRef.current!.style.display = 'none';
    rootRef.current!.offsetHeight;
    rootRef.current!.style.display = '';
  }, [shouldBeTwoRows]);

  return (
    <Div
      className={twClassNames('flex px-[20px] py-[10px] pointer-events-none', {
        'flex-row items-center gap-[10px]': !shouldBeTwoRows,
        'flex-col items-stretch gap-[5px]': shouldBeTwoRows,
      })}
      ref={mergeRefs(rootSizeRef, rootRef)}
    >
      <div className="flex flex-row items-center gap-[10px] flex-1 self-stretch">
        <BubbleIconButton
          className="pointer-events-auto"
          Icon={ArrowBackIcon}
          onClick={() => {
            hide();
          }}
        />
        <div className="flex-1 text-[23px] font-bold text-white mt-[0.2em] leading-[1.2]">
          {title}
        </div>
      </div>

      <div className="flex flex-row justify-center">
        <div className={twClassNames('flex flex-row gap-[5px]')}>
          {buttons?.map((button, i) => {
            const { Icon, title } = button;
            return (
              <Tooltip key={i} title={title}>
                <BubbleIconButton
                  key={i}
                  className="pointer-events-auto"
                  Icon={Icon}
                  onClick={() => {
                    if ('href' in button) {
                      window.open(button.href, '_blank');
                    } else if ('downloadUrl' in button) {
                      downloadFile(
                        button.downloadUrl,
                        button.fileName,
                        rootRef.current ?? undefined,
                      );
                    } else {
                      button.onClick();
                    }
                  }}
                />
              </Tooltip>
            );
          })}
        </div>
      </div>
    </Div>
  );
});
