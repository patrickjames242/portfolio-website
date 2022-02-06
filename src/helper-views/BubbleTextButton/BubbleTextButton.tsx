import BubbleEffect, {
	BubbleEffectRef,
} from "helper-views/BubbleEffect/BubbleEffect";
import React, { useEffect, useRef } from "react";
import styles from "./BubbleTextButton.module.scss";

type _BubbleTextButtonElementType = "a" | "button";

interface _BubbleTextButtonProps<
	ElementType extends _BubbleTextButtonElementType
> {
	buttonType: ElementType;
	titleText: string;
	htmlProps: {
		a: React.AnchorHTMLAttributes<HTMLAnchorElement>;
		button: React.ButtonHTMLAttributes<HTMLButtonElement>;
	}[ElementType];
}

export function _BubbleTextButton<
	ElementType extends _BubbleTextButtonElementType
>({ titleText, buttonType, htmlProps }: _BubbleTextButtonProps<ElementType>) {
	const bubbleEffectRef = useRef<BubbleEffectRef>(null);
	const rootRef = useRef<HTMLDivElement | HTMLAnchorElement>(null);

	useEffect(() => {
		const subscription = bubbleEffectRef.current?.isBubbled$.subscribe(
			(isBubbled) => {
				rootRef.current?.classList.toggle(styles.bubbleActive, isBubbled);
			}
		);
		return () => subscription?.unsubscribe();
	}, []);

	return React.createElement(
		buttonType,
		{
			...(htmlProps as any),
			className: [styles.BubbleTextButton, htmlProps.className].asClassString(),
			ref: rootRef,
		},
		<>
			<div className={styles.border} />
			<BubbleEffect ref={bubbleEffectRef} className={styles.BubbleEffect} />
			<div className={styles.title}>{titleText}</div>
		</>
	);
}

export interface BubbleTextButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	titleText: string;
}

export function BubbleTextButton({
	titleText,
	...htmlProps
}: BubbleTextButtonProps) {
	return (
		// eslint-disable-next-line react/jsx-pascal-case
		<_BubbleTextButton
			buttonType="button"
			titleText={titleText}
			htmlProps={htmlProps}
		/>
	);
}

export interface BubbleTextAnchorProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	titleText: string;
}

export function BubbleTextAnchor({
	titleText,
	...htmlProps
}: BubbleTextAnchorProps) {
	return (
		// eslint-disable-next-line react/jsx-pascal-case
		<_BubbleTextButton
			buttonType="a"
			titleText={titleText}
			htmlProps={htmlProps}
		/>
	);
}
