import { twClassNames } from '@/helpers/general/twClassNames';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import range from 'lodash/fp/range';
import { extend } from 'react-extend-components';

const OrangeImageView = extend('a')<{ imageUrls: string[] }>((
  Root,
  { imageUrls },
) => {
  const paddingTop = (3 / 5) * 100 + '%';

  return (
    <Root
      target="_blank"
      rel="noreferrer"
      className={twClassNames('group relative rounded-[10px] overflow-hidden')}
    >
      <div className="relative" style={{ paddingTop }}>
        {imageUrls.length > 1 ? (
          <div className="absolute inset-0 grid grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] gap-[7px] p-[7px]">
            {range(0, 4).map((i) => {
              return (
                <IndividualImageView
                  src={imageUrls[i] ?? null}
                  key={i}
                  className="relative"
                />
              );
            })}
          </div>
        ) : (
          <div className="absolute inset-[7px]">
            <IndividualImageView
              src={imageUrls[0]}
              className="absolute inset-0"
            />
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-accent/60 transition-[opacity] duration-[0.4s] group-hover:opacity-0"></div>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <button className="h-[60px] w-[60px] rounded-full bg-accent flex items-center justify-center group-hover:scale-125 transition-[transform] duration-[0.35s] drop-shadow-lg ">
          <FullscreenIcon className="text-white h-[30px] w-[30px] " />
        </button>
      </div>
    </Root>
  );
});

const IndividualImageView = extend('div')<{ src: string | null }>((
  Root,
  { src },
) => {
  return (
    <Root className="relative overflow-hidden rounded-[5px] bg-[#142547]">
      {src && (
        <img
          className="block absolute left-0 top-0 w-full  grayscale-[70%] transition-[filter] duration-[0.4s] group-hover:grayscale-0"
          src={src}
          alt=""
        />
      )}
    </Root>
  );
});

export default OrangeImageView;
