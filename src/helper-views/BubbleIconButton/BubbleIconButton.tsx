import colors from '@/helpers/_colors.module.scss';
import { CSSProperties } from 'react';
import { extend } from 'react-extend-components';
import { ComponentType } from 'react-spring';
import BubbleEffect from '../BubbleEffect/BubbleEffect';

export const BubbleIconButton = extend('button')<{
  Icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  bubbleColor?: string;
  iconColor?: string;
  hoverIconColor?: string;
}>((
  Root,
  { Icon, bubbleColor = colors.accent, iconColor = 'white', hoverIconColor },
) => {
  return (
    <Root className="s-[50px] relative flex items-center justify-center rounded-full overflow-hidden group ">
      <BubbleEffect className="absolute s-full" bubbleColor={bubbleColor} />
      <Icon
        className="relative !s-[30px] pointer-events-none text-[var(--BubbleIconButton-iconColor)] group-hover:text-[var(--BubbleIconButton-hoverIconButton)] !transition-[color] !duration-400"
        style={
          {
            '--BubbleIconButton-iconColor': iconColor,
            '--BubbleIconButton-hoverIconButton': hoverIconColor,
          } as any
        }
      />
    </Root>
  );
});
