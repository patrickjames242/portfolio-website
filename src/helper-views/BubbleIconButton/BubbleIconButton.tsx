import colors from '@/helpers/_colors.module.scss';
import { CSSProperties, ComponentType } from 'react';
import { extend } from 'react-extend-components';
import BubbleEffect from '../BubbleEffect/BubbleEffect';

export const BubbleIconButton = extend('button')<{
  Icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  bubbleColor?: string;
  iconColor?: string;
  hoverIconColor?: string;
}>((
  Root,
  {
    Icon,
    bubbleColor = colors.accent,
    iconColor = 'white',
    hoverIconColor = 'white',
  },
) => {
  return (
    <Root className="s-[50px] relative flex items-center justify-center rounded-full overflow-hidden group ">
      <BubbleEffect className="absolute inset-0" bubbleColor={bubbleColor} />
      <Icon
        className="relative !s-[30px] pointer-events-none text-[var(--BubbleIconButton-iconColor)] group-hover:text-[var(--BubbleIconButton-hoverIconButton)] !transition-[color,_fill] !duration-400"
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
