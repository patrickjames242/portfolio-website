import { twClassNames } from '@/helpers/general/twClassNames';
import { extend } from 'react-extend-components';

const OrangeImageView = extend('a')<{ imageUrl: string }>((
  Root,
  { imageUrl },
) => {
  const paddingTop = (3 / 5) * 100 + '%';
  return (
    <Root
      target="_blank"
      rel="noreferrer"
      className={twClassNames('group relative rounded-[10px] overflow-hidden')}
    >
      <div className="relative" style={{ paddingTop }}>
        <img
          className="block absolute left-0 top-0 w-full object-contain grayscale-[70%] transition-[filter] duration-[0.4s] group-hover:grayscale-0"
          src={imageUrl}
          alt=""
        />
      </div>
      <div className="absolute inset-0 bg-accent/60 transition-[opacity] duration-[0.4s] group-hover:opacity-0"></div>
    </Root>
  );
});

export default OrangeImageView;
