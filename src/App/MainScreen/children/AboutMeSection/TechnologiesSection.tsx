import Tooltip from '@mui/material/Tooltip';
import SectionHeader from 'helper-views/SectionHeader/SectionHeader';
import { PresentationSection } from 'helpers/AnimationController';
import { technologiesList } from 'helpers/technologies/technologies';
import { useImperativeHandle, useRef } from 'react';
import { extend } from 'react-extend-components';

export interface TechnologiesSectionRef {
  getPresentationSection(): PresentationSection;
}

export const TechnologiesSection = extend('div')<{}, TechnologiesSectionRef>((
  Root,
  { ref },
) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const sectionHeaderRef = useRef<HTMLDivElement>(null);
  const technologiesGridRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      getPresentationSection() {
        return {
          sectionRoot: rootRef.current!,
          threshold: 0.05,
          presentationItems: [
            { slideUpElement: sectionHeaderRef.current! },
            { slideUpElement: technologiesGridRef.current! },
          ],
        };
      },
    }),
    [],
  );

  return (
    <Root className="grid gap-[30px] max-w-[900px]" ref={rootRef}>
      <SectionHeader
        ref={sectionHeaderRef}
        titleText="Technologies I'm Experienced With"
        includeLine={false}
        className="slide-up-element"
      />
      <div
        ref={technologiesGridRef}
        className="grid grid-cols-[repeat(auto-fill,_55px)] gap-[25px] justify-around"
      >
        {technologiesList.map((x) => (
          <Tooltip key={x.name} title={x.name}>
            <a className="group" href={x.url} target="_blank" rel="noreferrer">
              <img
                src={x.iconSrc}
                alt={x.name}
                className="s-[55px] object-contain transition-transform duration-[0.3s] group-hover:scale-[1.2]"
              />
            </a>
          </Tooltip>
        ))}
      </div>
    </Root>
  );
});
