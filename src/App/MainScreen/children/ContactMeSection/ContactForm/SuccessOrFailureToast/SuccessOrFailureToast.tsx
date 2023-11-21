import React, { useImperativeHandle, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { animated, useTransition } from 'react-spring';
import CheckmarkIcon from './CheckmarkIcon';
import styles from './SuccessOrFailureToast.module.scss';
import XIcon from './XIcon';

export interface SuccessOrFailureToastRef {
  showToast(config: { successful: boolean; message: string }): void;
}

export interface SuccessOrFailureToastProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SuccessOrFailureToast = (() => {
  const Toast: React.ForwardRefRenderFunction<
    SuccessOrFailureToastRef,
    SuccessOrFailureToastProps
  > = ({ ...htmlAttributes }, ref) => {
    const [messageInfo, setMessageInfo] = useState<{
      successful: boolean;
      message: string;
    }>({ successful: true, message: '' });
    const [show, setShow] = useState(false);

    const transitions = useTransition(
      show,
      (() => {
        const from = { transform: 'translateY(20px)', opacity: 0 };
        return {
          from,
          enter: { transform: 'translateY(0px)', opacity: 1 },
          leave: from,
        };
      })(),
    );

    const timerRef = useRef<number | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        showToast(config) {
          timerRef.current && clearTimeout(timerRef.current);
          ReactDOM.unstable_batchedUpdates(() => {
            setMessageInfo(config);
            setShow(true);
          });
          timerRef.current = setTimeout(() => {
            setShow(false);
          }, 4000) as any;
        },
      }),
      [],
    );

    return transitions(
      (transitionStyles, item) =>
        item &&
        ReactDOM.createPortal(
          <animated.div
            className={styles.errorMessageToastHolder}
            style={transitionStyles}
          >
            <div
              {...htmlAttributes}
              className={[
                styles.ErrorMessageToast,
                htmlAttributes.className,
                messageInfo.successful ? undefined : styles.error,
              ].asClassString()}
            >
              <div className={styles.topLine} />
              {messageInfo.successful ? <CheckmarkIcon /> : <XIcon />}
              <div className={styles.text}>{messageInfo.message}</div>
            </div>
          </animated.div>,
          window.document.body,
          'ErrorMessageToast',
        ),
    );
  };
  return React.memo(React.forwardRef(Toast));
})();
export default SuccessOrFailureToast;
