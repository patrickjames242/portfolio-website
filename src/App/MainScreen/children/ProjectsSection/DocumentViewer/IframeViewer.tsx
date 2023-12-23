import { extend } from 'react-extend-components';
import { DocumentViewerWrapper } from './DocumentViewerWrapper';

export const IframeViewer = extend('div')<{ src: string }>((Root, { src }) => {
  return (
    <Root className="s-full">
      <DocumentViewerWrapper className="s-full max-w-[1200px] mx-auto">
        <iframe className="s-full pointer-events-auto" src={src}></iframe>
      </DocumentViewerWrapper>
    </Root>
  );
});
