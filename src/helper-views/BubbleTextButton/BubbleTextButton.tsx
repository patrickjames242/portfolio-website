import BubbleEffect from "helper-views/BubbleEffect/BubbleEffect";
import React from "react";
import styles from "./BubbleTextButton.module.scss";

export interface BubbleTextButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
}

function BubbleTextButton(props: BubbleTextButtonProps) {
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

export default BubbleTextButton;
