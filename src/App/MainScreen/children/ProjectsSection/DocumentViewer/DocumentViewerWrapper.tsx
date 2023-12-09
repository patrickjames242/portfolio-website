import { ReactNode } from 'react';
import { extend } from 'react-extend-components';

export const DocumentViewerWrapper = extend('div')<{ children?: ReactNode }>(
  (Div, { children }) => (
    <Div className="overflow-hidden rounded-xl bg-background">{children}</Div>
  ),
);
