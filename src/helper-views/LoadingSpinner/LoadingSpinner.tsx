import React from 'react';
import styles from './LoadingSpinner.module.scss';

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  ...htmlAttributes
}: LoadingSpinnerProps) => {
  return (
    <div
      {...htmlAttributes}
      className={[
        styles.LoadingSpinner,
        htmlAttributes.className,
      ].asClassString()}
    >
      <div className={styles.loadingIndicator}></div>
    </div>
  );
};

export default LoadingSpinner;
