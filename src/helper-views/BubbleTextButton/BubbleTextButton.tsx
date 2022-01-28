import BubbleEffect from "helper-views/BubbleEffect/BubbleEffect";
import React from "react";
import styles from "./BubbleTextButton.module.scss";

export interface BubbleTextButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
}

export function BubbleTextButton(props: BubbleTextButtonProps) {
	return (
		<button
			{...props}
			className={[styles.BubbleTextButton, props.className].asClassString()}
		>
			<BubbleEffect className={styles.BubbleEffect} />
			<div className={styles.title}>{props.title}</div>
		</button>
	);
}

export interface BubbleTextAnchorProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	title: string;
}

export function BubbleTextAnchor(props: BubbleTextAnchorProps) {
	return (
		<a
			{...props}
			className={[styles.BubbleTextButton, props.className].asClassString()}
		>
			<BubbleEffect className={styles.BubbleEffect} />
			<div className={styles.title}>{props.title}</div>
		</a>
	);
}
