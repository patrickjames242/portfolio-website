import { BubbleIconButton } from '@/helper-views/BubbleIconButton/BubbleIconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { extend } from 'react-extend-components';

export type DocumentViewerHeaderButton = {
  title: string;
} & ({ href: string } | { onClick: () => void });

export const DocumentViewerHeader = extend('div')<{
  hide: () => void;
  title?: string;
  buttons?: DocumentViewerHeaderButton[];
}>((Div, { hide, title }) => {
  return (
    <Div className=" flex flex-row items-center gap-[10px] px-[20px] py-[10px] pointer-events-none">
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
    </Div>
  );
});
