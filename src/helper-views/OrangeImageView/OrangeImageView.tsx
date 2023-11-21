import { AnchorHTMLAttributes } from 'react';
import styles from './OrangeImageView.module.scss';

export default function OrangeImageView({
  imageUrl,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { imageUrl: string }) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      {...props}
      className={[styles.OrangeImageView, className].asClassString()}
    >
      <div>
        <img src={imageUrl} alt="" />
      </div>
      <div className={styles.imageCover}></div>
    </a>
  );
}
