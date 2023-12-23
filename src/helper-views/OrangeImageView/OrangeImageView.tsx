import { twClassNames } from '@/helpers/general/twClassNames';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import range from 'lodash/fp/range';
import { CSSProperties } from 'react';
import { extend } from 'react-extend-components';

export type ImageViewImage =
  | string
  | { url: string; imageStyle?: CSSProperties };

const OrangeImageView = extend('button')<{
  images: ImageViewImage[];
}>((Root, { images }) => {
  const paddingTop = (3 / 5) * 100 + '%';

  return (
    <Root
      className={twClassNames('group relative rounded-[10px] overflow-hidden')}
    >
      <div className="relative" style={{ paddingTop }}>
        {images.length > 1 ? (
          <div className="absolute inset-0 grid grid-cols-[1fr_1fr] grid-rows-[1fr_1fr] gap-[7px] p-[7px]">
            {range(0, 4).map((i) => {
              return (
                <IndividualImageView
                  image={images[i] ?? null}
                  key={i}
                  className="relative"
                />
              );
            })}
          </div>
        ) : (
          <div className="absolute inset-[7px]">
            <IndividualImageView
              image={images[0]}
              className="absolute inset-0"
            />
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-accent/60 transition-[opacity] duration-[0.4s] group-hover:opacity-0"></div>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="h-[60px] w-[60px] rounded-full bg-accent flex items-center justify-center group-hover:scale-125 transition-[transform] duration-[0.35s] drop-shadow-lg ">
          <FullscreenIcon className="text-white h-[30px] w-[30px] " />
        </div>
      </div>
    </Root>
  );
});

const IndividualImageView = extend('div')<{ image: ImageViewImage | null }>((
  Root,
  { image },
) => {
  const imageUrl =
    typeof image === 'string' || image == null ? image : image?.url;
  const imageStyle =
    image && typeof image === 'object' ? image.imageStyle : undefined;
  return (
    <Root className="relative overflow-hidden rounded-[5px] bg-[#142547]">
      {imageUrl && (
        <img
          className="block absolute left-0 top-0 w-full grayscale-[70%] transition-[filter] duration-[0.4s] group-hover:grayscale-0"
          src={imageUrl}
          style={imageStyle}
          alt=""
        />
      )}
    </Root>
  );
});

export default OrangeImageView;
