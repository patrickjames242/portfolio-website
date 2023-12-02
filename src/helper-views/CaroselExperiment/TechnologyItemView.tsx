import { Technology } from '@/helpers/technologies/technologies';
import { extend } from 'react-extend-components';

export const TechnologyItemView = extend('div')<{ item: Technology }>((
  Div,
  { item },
) => {
  return (
    <Div className="min-h-[100px] min-w-[200px] bg-white/10 rounded-xl p-[10px] flex flex-row items-center gap-[15px]">
      <div>
        <img src={item.iconSrc} className="w-[60px] h-[60px]" />
        <div className="font-medium text-[18px]">{item.name}</div>
      </div>
    </Div>
  );
});
