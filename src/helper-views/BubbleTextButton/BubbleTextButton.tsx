import BubbleEffect from "helper-views/BubbleEffect/BubbleEffect";
import { classNames, HTMLAttributes } from "helpers/general";
import styles from "./BubbleTextButton.module.scss";

export interface BubbleTextButtonProps
	extends HTMLAttributes<HTMLButtonElement> {
	title: string;
}

function BubbleTextButton(props: BubbleTextButtonProps) {
	return (
		<button
			{...props}
			className={classNames(styles.BubbleTextButton, props.className)}
		>
			<BubbleEffect className={styles.BubbleEffect} />
			<div className={styles.title}>{props.title}</div>
		</button>
	);
}

export default BubbleTextButton;
