import React from 'react';
import { extend } from 'react-extend-components';

export interface SectionHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SectionHeader = extend('h3')<{
  titleText: string;
  includeLine?: boolean;
}>((Root, { titleText, includeLine = true }) => {
  return (
    <Root
      className="flex flex-row items-center gap-[15px] justify-start text-[clamp(28px,_5vw,_37px)]"
      style={{ gridAutoColumns: '1fr' }}
    >
      <div className="leading-[1] font-medium">
        <span className=" relative top-[0.1em] text-[1.6em] text-accent  font-bold">
          {'< '}
        </span>
        {titleText}
        <span className="relative top-[0.05em] text-[1.3em] text-accent font-bold">
          {' />'}
        </span>
      </div>
      {includeLine && (
        <div className="h-[1px] bg-[rgb(29,_48,_85)] ml-[15px] flex-1"></div>
      )}
    </Root>
  );
});

export default SectionHeader;
