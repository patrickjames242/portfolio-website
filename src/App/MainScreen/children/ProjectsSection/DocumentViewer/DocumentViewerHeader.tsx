import { BubbleIconButton } from '@/helper-views/BubbleIconButton/BubbleIconButton';
import { twClassNames } from '@/helpers/general/twClassNames';
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
} & ({ href: string } | { onClick: () => void });

export const DocumentViewerHeader = extend('div')<{
  hide: () => void;
  title?: string;
  buttons?: DocumentViewerHeaderButton[];
}>((Div, { hide, title, buttons }) => {
  const [rootSizeRef, rootSize$] = useElementSize$({
    sendInitialSizeImmediately: false,
  });
  const rootRef = useRef<HTMLDivElement>(null);
  const [iconsViewSizeRef, iconsViewSize$] = useElementSize$({
    sendInitialSizeImmediately: false,
  });

  const shouldBeTwoRows$ = useMemo(() => {
    return combineLatest({
      rootSize: rootSize$,
      iconsViewSize: iconsViewSize$,
    }).pipe(
      map(({ rootSize, iconsViewSize }) => {
        return iconsViewSize.width / (rootSize.width - 200) > 0.7;
      }),
      distinctUntilChanged(),
    );
  }, [iconsViewSize$, rootSize$]);

  const shouldBeTwoRows = useObservableValue(shouldBeTwoRows$, false);

  useEffect(() => {
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
        <div className="flex-1 text-[23px] font-bold text-white mt-[0.2em]">
          {title}
        </div>
      </div>

      <div className="flex flex-row justify-center">
        <div
          ref={iconsViewSizeRef}
          className={twClassNames('flex flex-row gap-[5px]')}
        >
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
