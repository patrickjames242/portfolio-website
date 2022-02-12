import React, {
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
} from "react";
import styles from "./SlideUpSentence.module.scss";

export enum Alignment {
	left,
	right,
	center,
}

export interface SlideUpSentenceRef {
	animate: (delayInSeconds?: number) => Promise<void>;
}

export interface SlideUpSentenceProps
	extends React.HTMLAttributes<HTMLDivElement> {
	alignment: Alignment;
	children: string | React.ReactNode[];
	slideUpImmediately?: boolean; // defaults to true
}

const SlideUpSentence: React.ForwardRefRenderFunction<
	SlideUpSentenceRef,
	SlideUpSentenceProps
> = ({ alignment, children, slideUpImmediately, ...htmlAttributes }, ref) => {
	slideUpImmediately = slideUpImmediately ?? true;

	const words = useMemo(() => {
		const nodes = typeof children === "string" ? children.split(" ") : children;
		return nodes.map((word) => ({
			text: word,
			ref: React.createRef<WordRef>(),
		}));
	}, [children]);

	const animate = useCallback(
		async (delayInSeconds?: number): Promise<void> => {
			await Promise.all(
				words.map(async ({ ref }, i) => {
					await ref.current?.animateUp(i * 0.1 + (delayInSeconds ?? 0));
				})
			);
		},
		[words]
	);

	useEffect(() => {
		// doesn't animate unless it's wrapped in a set timeout
		setTimeout(() => {
			if (slideUpImmediately) animate();
		}, 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useImperativeHandle(ref, () => ({ animate }), [animate]);

	const alignmentClassName = useMemo(() => {
		switch (alignment) {
			case Alignment.left:
				return styles.leftAligned;
			case Alignment.right:
				return styles.rightAligned;
			case Alignment.center:
				return styles.centerAligned;
			default:
				return "";
		}
	}, [alignment]);

	return (
		<div
			{...htmlAttributes}
			className={[
				styles.SlideUpSentence,
				htmlAttributes.className,
				alignmentClassName,
			].asClassString()}
		>
			{words.map((word, i) => (
				<Word key={i} ref={word.ref}>
					{word.text}
				</Word>
			))}
		</div>
	);
};

export default React.forwardRef(SlideUpSentence);

interface WordRef {
	animateUp: (delayInSeconds?: number) => Promise<void>;
}

interface WordProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const Word = (() => {
	const Word: React.ForwardRefRenderFunction<WordRef, WordProps> = (
		{ children, ...htmlAttributes }: WordProps,
		ref
	) => {
		const innerWordBoxRef = useRef<HTMLDivElement>(null);

		useImperativeHandle(
			ref,
			() => ({
				animateUp(delayInSeconds) {
					return new Promise((resolve, reject) => {
						const innerBox = innerWordBoxRef.current;
						if (innerBox == null) {
							resolve();
							return;
						}
						if (delayInSeconds != null) {
							innerBox.style.transitionDelay = delayInSeconds + "s";
						}
						innerBox.style.transform = "initial";
						const delayInMilliseconds = (delayInSeconds ?? 0) * 1000;
						setTimeout(() => {
							innerBox.style.opacity = "1";
						}, delayInMilliseconds);
						setTimeout(() => {
							resolve();
						}, delayInMilliseconds + parseFloat(styles.transitionDurationInSeconds) * 1000);
					});
				},
			}),
			[]
		);

		return (
			<span
				{...htmlAttributes}
				className={[styles.Word, htmlAttributes.className].asClassString()}
			>
				<span className={styles.innerBox} ref={innerWordBoxRef}>
					{children}
				</span>
			</span>
		);
	};
	return React.forwardRef(Word);
})();
