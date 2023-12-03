import { twClassNames } from '@/helpers/general/twClassNames';
import { useElementSize } from '@/helpers/hooks/useElementSize';
import { useMemo, useState } from 'react';
import { extend } from 'react-extend-components';
import { DocumentViewerWrapper } from './DocumentViewerWrapper';

export const ImageViewer = extend('div')<{ src: string }>((Div, { src }) => {
  const [rootSizeRef, rootSize] = useElementSize({
    sendInitialSizeImmediately: false,
  });
  const [imageDimensions, setImageDimensions] = useState<{
    height: number;
    width: number;
  } | null>(null);

  const actualDimensions = useMemo(() => {
    if (imageDimensions == null) return null;
    if (imageDimensions.height >= imageDimensions.width) {
      const height = imageDimensions.height.clamp({ max: rootSize.height });
      return {
        height: height,
        width: height * (imageDimensions.width / imageDimensions.height),
      };
    } else {
      const width = imageDimensions.width.clamp({ max: rootSize.width });
      return {
        height: width * (imageDimensions.height / imageDimensions.width),
        width: width,
      };
    }
  }, [imageDimensions, rootSize.height, rootSize.width]);

  return (
    <Div
      ref={rootSizeRef}
      className="pointer-events-none relative overflow-hidden s-full"
    >
      <DocumentViewerWrapper
        className={twClassNames(
          'absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]',
          {
            'opacity-0': imageDimensions == null,
          },
        )}
        style={{
          height: actualDimensions?.height,
          width: actualDimensions?.width,
        }}
      >
        <img
          className={twClassNames(
            'pointer-events-auto absolute left-0 top-0 block object-contain s-full',
          )}
          src={src}
          onLoad={(e) => {
            const target = e.target as HTMLImageElement;
            setImageDimensions({
              height: target.naturalHeight,
              width: target.naturalWidth,
            });
          }}
        />
      </DocumentViewerWrapper>
    </Div>
  );
});
