import SectionHeader from "helper-views/SectionHeader/SectionHeader";
import { clampNum, ifThen } from "helpers/general";
import { useCallbackRef, useMediaQuery } from "helpers/hooks";
import React, { useLayoutEffect, useState } from "react";
import { filter } from "rxjs";
import styles from "./AboutMeSection.module.scss";
import patrickImage from "./patrick-image.jpg";
import technologies from "./technologies";

export interface AboutMeSectionProps
	extends React.HTMLAttributes<HTMLDivElement> {}

const AboutMeSection: React.ForwardRefRenderFunction<
	HTMLDivElement,
	AboutMeSectionProps
> = ({ ...htmlAttributes }, ref) => {
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
			<IntroductionSection />
			<TechnologiesSection />
		</div>
	);
};

export default React.forwardRef(AboutMeSection);

interface IntroductionSectionProps
	extends React.HTMLAttributes<HTMLDivElement> {}

const IntroductionSection: React.FC<IntroductionSectionProps> = ({
	...htmlAttributes
}: IntroductionSectionProps) => {
	const imageHolderRef = useCallbackRef<HTMLDivElement>();
	const imageRef = useCallbackRef<HTMLImageElement>();

	const [showHeaderAboveColumns, setShowHeaderAboveColumns] = useState(false);

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
			titleText="A Little About Me"
			includeLine={false}
			className={styles.SectionHeader}
		/>
	);
	return (
		<div
			{...htmlAttributes}
			className={[
				styles.IntroductionSection,
				htmlAttributes.className,
			].asClassString()}
		>
			{showHeaderAboveColumns && sectionHeader}
			<div className={styles.content}>
				<div className={styles.leftSide}>
					{ifThen(showHeaderAboveColumns === false, sectionHeader)}
					<p>
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
					<p>
						👨‍💻 I started programming when I came across the{" "}
						<a
							className="underline-on-hover"
							href="https://www.apple.com/swift/playgrounds/"
							target="_blank"
							rel="noreferrer"
						>
							Swift Playgrounds
						</a>{" "}
						iPad game, and immediately I was hooked! Soon after, I became quite
						the avid iOS Developer, writing native iPhone and iPad apps using{" "}
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
					<p>
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
				<div ref={imageHolderRef} className={styles.imageHolder}>
					<img ref={imageRef} src={patrickImage} alt="Patrick" />
					<div className={styles.border} />
				</div>
			</div>
		</div>
	);
};

interface TechnologiesSectionProps
	extends React.HTMLAttributes<HTMLDivElement> {}

const TechnologiesSection: React.FC<TechnologiesSectionProps> = ({
	...htmlAttributes
}: TechnologiesSectionProps) => {
	return (
		<div
			{...htmlAttributes}
			className={[
				styles.TechnologiesSection,
				htmlAttributes.className,
			].asClassString()}
		>
			<SectionHeader titleText="Technologies I've Used" includeLine={false} />
			<div className={styles.technologiesGrid}>
				{technologies.map((x) => (
					<img src={x.iconSrc} alt={x.name} key={x.name} />
				))}
			</div>
		</div>
	);
};
