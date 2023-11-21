import BubbleEffect, {
  BubbleEffectRef,
} from 'helper-views/BubbleEffect/BubbleEffect';
import { useCallbackRef } from 'helpers/hooks';
import React, { ForwardedRef, useEffect, useRef } from 'react';
import styles from './BubbleTextButton.module.scss';

type _BubbleTextButtonElementType = 'a' | 'button';

interface _BubbleTextButtonProps<
  ElementType extends _BubbleTextButtonElementType,
> {
  buttonType: ElementType;
  titleText: string;
  htmlProps: {
    a: React.AnchorHTMLAttributes<HTMLAnchorElement>;
    button: React.ButtonHTMLAttributes<HTMLButtonElement>;
  }[ElementType];
}

const _BubbleTextButton = (() => {
  type GetHTMLElement<ElementType extends _BubbleTextButtonElementType> = {
    a: HTMLAnchorElement;
    button: HTMLButtonElement;
  }[ElementType];

  function _BubbleTextButton<ElementType extends _BubbleTextButtonElementType>(
    { titleText, buttonType, htmlProps }: _BubbleTextButtonProps<ElementType>,
    forwardedRef: React.ForwardedRef<GetHTMLElement<ElementType>>,
  ) {
    const bubbleEffectRef = useRef<BubbleEffectRef>(null);
    const rootRef = useCallbackRef<GetHTMLElement<ElementType>>(forwardedRef);

    useEffect(() => {
      const subscription = bubbleEffectRef.current?.isBubbled$.subscribe(
        (isBubbled) => {
          rootRef.getLatest()?.classList.toggle(styles.bubbleActive, isBubbled);
        },
      );
      return () => subscription?.unsubscribe();
    }, [rootRef]);

    return React.createElement(
      buttonType,
      {
        ...(htmlProps as any),
        className: [
          styles.BubbleTextButton,
          htmlProps.className,
        ].asClassString(),
        ref: rootRef,
      },
      <>
        <div className={styles.border} />
        <BubbleEffect ref={bubbleEffectRef} className={styles.BubbleEffect} />
        <div className={styles.title}>{titleText}</div>
      </>,
    );
  }

  return React.forwardRef(_BubbleTextButton);
})();

export interface BubbleTextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  titleText: string;
}

export const BubbleTextButton = (() => {
  function BubbleTextButton(
    { titleText, ...htmlProps }: BubbleTextButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) {
    return (
      // eslint-disable-next-line react/jsx-pascal-case
      <_BubbleTextButton
        ref={ref}
        buttonType="button"
        titleText={titleText}
        htmlProps={htmlProps}
      />
    );
  }
  return React.forwardRef(BubbleTextButton);
})();

export interface BubbleTextAnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  titleText: string;
}

export const BubbleTextAnchor = (() => {
  function BubbleTextAnchor(
    { titleText, ...htmlProps }: BubbleTextAnchorProps,
    ref: ForwardedRef<HTMLAnchorElement>,
  ) {
    return (
      // eslint-disable-next-line react/jsx-pascal-case
      <_BubbleTextButton
        ref={ref}
        buttonType="a"
        titleText={titleText}
        htmlProps={htmlProps}
      />
    );
  }
  return React.forwardRef(BubbleTextAnchor);
})();
