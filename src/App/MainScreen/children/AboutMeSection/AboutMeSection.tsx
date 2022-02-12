import SectionHeader from "helper-views/SectionHeader/SectionHeader";
import { clampNum, getAnimationStack, ifThen, wait } from "helpers/general";
import { useCallbackRef, useMediaQuery } from "helpers/hooks";
import { animateSlideUpElement } from "helpers/slide-up-animation/slide-up-animation";
import { technologiesList } from "helpers/technologies/technologies";
import React, {
	useEffect,
	useImperativeHandle,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { filter } from "rxjs";
import styles from "./AboutMeSection.module.scss";
import patrickImage from "./patrick-image.jpg";

export interface AboutMeSectionProps
	extends React.HTMLAttributes<HTMLDivElement> {}

const AboutMeSection: React.ForwardRefRenderFunction<
	HTMLDivElement,
	AboutMeSectionProps
> = ({ ...htmlAttributes }, ref) => {
	const introductionRef = useRef<IntroductionSectionRef>(null);
	const technologiesRef = useRef<TechnologiesSectionRef>(null);

	useEffect(() => {
		const { addElementsToAnimationStack } = getAnimationStack();
		const observer = new IntersectionObserver((entries) => {
			addElementsToAnimationStack(
				entries
					.filter((x) => x.isIntersecting)
					.map((entry) => () => {
						if (entry.target === introductionRef.current?.root) {
							introductionRef.current?.animate();
							return { animationLengthSeconds: 800 };
						} else if (entry.target === technologiesRef.current?.root) {
							technologiesRef.current?.animate();
							return { animationLengthSeconds: 400 };
						}
					})
			);
		});
		observer.observe(introductionRef.current!.root!);
		observer.observe(technologiesRef.current!.root!);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			{...htmlAttributes}
			ref={ref}
			className={[
				styles.AboutMeSection,
				htmlAttributes.className,
			].asClassString()}
		>
			<div className={styles.backgroundView} />
			<IntroductionSection ref={introductionRef} />
			<TechnologiesSection ref={technologiesRef} />
		</div>
	);
};

export default React.forwardRef(AboutMeSection);

interface IntroductionSectionRef {
	animate(): void;
	root: HTMLDivElement | null;
}

interface IntroductionSectionProps
	extends React.HTMLAttributes<HTMLDivElement> {}
const IntroductionSection = (() => {
	const IntroductionSection: React.ForwardRefRenderFunction<
		IntroductionSectionRef,
		IntroductionSectionProps
	> = ({ ...htmlAttributes }, ref) => {
		const rootRef = useRef<HTMLDivElement>(null);
		const sectionHeaderRef = useRef<HTMLDivElement>(null);
		const paragraphRefs = useRef(
			[1, 2, 3].map(() => React.createRef<HTMLParagraphElement>())
		).current;
		const imageHolderRef = useCallbackRef<HTMLDivElement>();
		const imageRef = useCallbackRef<HTMLImageElement>();

		const [showHeaderAboveColumns, setShowHeaderAboveColumns] = useState(false);

		useImperativeHandle(
			ref,
			() => ({
				get root() {
					return rootRef.current;
				},
				animate: async () => {
					for (const refs of [
						[sectionHeaderRef, imageHolderRef],
						...paragraphRefs.map((x) => [x]),
					]) {
						await wait(200);
						refs.forEach((ref) =>
							animateSlideUpElement(
								"current" in ref ? ref.current! : ref.getLatest()!
							)
						);
					}
				},
			}),
			[imageHolderRef, paragraphRefs]
		);

		useLayoutEffect(() => {
			const resizeObservableListener = () => {
				const imageLatest = imageRef.getLatest(),
					imageHolderLatest = imageHolderRef.getLatest();
				if (imageLatest == null || imageHolderLatest == null) return;
				const inset =
					clampNum(imageLatest.clientWidth * 0.1, { min: 13, max: 25 }) + "px";
				imageHolderLatest?.style.setProperty("--inset", inset);
			};
			resizeObservableListener();
			const resizeObserver = new ResizeObserver(resizeObservableListener);
			const imageRefSubscription = imageRef.latest$
				.pipe(filter((x) => x != null))
				.subscribe((image) => {
					resizeObserver.observe(image!);
				});
			return () => {
				imageRefSubscription.unsubscribe();
				resizeObserver.disconnect();
			};
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		useMediaQuery(
			`(max-width: ${styles.imageLinedUpWithDescriptionMaxWidth})`,
			(matches) => setShowHeaderAboveColumns(matches),
			[]
		);

		const sectionHeader = (
			<SectionHeader
				ref={sectionHeaderRef}
				titleText="A Little About Me"
				includeLine={false}
				className={[styles.SectionHeader, "slide-up-element"].asClassString()}
			/>
		);
		return (
			<div
				{...htmlAttributes}
				className={[
					styles.IntroductionSection,
					htmlAttributes.className,
				].asClassString()}
				ref={rootRef}
			>
				{showHeaderAboveColumns && sectionHeader}
				<div className={styles.content}>
					<div className={styles.leftSide}>
						{ifThen(showHeaderAboveColumns === false, sectionHeader)}
						<p ref={paragraphRefs[0]} className="slide-up-element">
							👋 Hi! I'm Patrick, a software developer currently living in{" "}
							<a
								className="underline-on-hover"
								href="https://www.google.com/maps/place/Nassau/@25.0324949,-77.5471788,11z/data=!3m1!4b1!4m5!3m4!1s0x892f7c99b981dbc9:0x2aef01d3485e50d2!8m2!3d25.0443312!4d-77.3503609"
								target="_blank"
								rel="noreferrer"
							>
								Nassau, Bahamas.
							</a>{" "}
							I specialize in producing high quality apps and websites that look
							great and are a joy to use.
						</p>
						<p ref={paragraphRefs[1]} className="slide-up-element">
							👨‍💻 I started programming when I came across the{" "}
							<a
								className="underline-on-hover"
								href="https://www.apple.com/swift/playgrounds/"
								target="_blank"
								rel="noreferrer"
							>
								Swift Playgrounds
							</a>{" "}
							iPad game, and immediately I was hooked! Soon after, I became
							quite the avid iOS Developer, writing native iPhone and iPad apps
							using{" "}
							<a
								className="underline-on-hover"
								target="_blank"
								rel="noreferrer"
								href="https://www.apple.com/swift/"
							>
								Swift
							</a>{" "}
							and{" "}
							<a
								className="underline-on-hover"
								target="_blank"
								rel="noreferrer"
								href="https://developer.apple.com/xcode/"
							>
								Xcode.
							</a>{" "}
							From there, I transitioned into building full-stack web
							applications.
						</p>
						<p ref={paragraphRefs[2]} className="slide-up-element">
							👨‍🎓 Additionally, I'm a recent graduate of{" "}
							<a
								className="underline-on-hover"
								target="_blank"
								rel="noreferrer"
								href="https://ub.edu.bs/"
							>
								The University of The Bahamas
							</a>{" "}
							where I earned a Bachelors degree in Computer Information Systems.
						</p>
					</div>
					<div
						ref={imageHolderRef}
						className={[styles.imageHolder, "slide-up-element"].asClassString()}
					>
						<img ref={imageRef} src={patrickImage} alt="Patrick" />
						<div className={styles.border} />
					</div>
				</div>
			</div>
		);
	};

	return React.forwardRef(IntroductionSection);
})();

interface TechnologiesSectionRef {
	animate(): void;
	root: HTMLDivElement | null;
}

interface TechnologiesSectionProps
	extends React.HTMLAttributes<HTMLDivElement> {}
const TechnologiesSection = (() => {
	const TechnologiesSection: React.ForwardRefRenderFunction<
		TechnologiesSectionRef,
		TechnologiesSectionProps
	> = ({ ...htmlAttributes }, forwardedRef) => {
		const rootRef = useRef<HTMLDivElement>(null);
		const sectionHeaderRef = useRef<HTMLDivElement>(null);
		const technologiesGridRef = useRef<HTMLDivElement>(null);

		useImperativeHandle(forwardedRef, () => ({
			get root() {
				return rootRef.current;
			},
			async animate() {
				await wait(200);
				animateSlideUpElement(sectionHeaderRef.current!);
				await wait(200);
				animateSlideUpElement(technologiesGridRef.current!);
			},
		}));

		return (
			<div
				{...htmlAttributes}
				className={[
					styles.TechnologiesSection,
					htmlAttributes.className,
				].asClassString()}
				ref={rootRef}
			>
				<SectionHeader
					ref={sectionHeaderRef}
					titleText="Technologies I've Used"
					includeLine={false}
					className="slide-up-element"
				/>
				<div
					ref={technologiesGridRef}
					className={[
						styles.technologiesGrid,
						"slide-up-element",
					].asClassString()}
				>
					{technologiesList.map((x) => (
						<img src={x.iconSrc} alt={x.name} key={x.name} />
					))}
				</div>
			</div>
		);
	};

	return React.forwardRef(TechnologiesSection);
})();
