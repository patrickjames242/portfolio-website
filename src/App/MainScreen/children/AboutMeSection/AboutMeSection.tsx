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
			titleText="Let Me Introduce Myself"
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
						Ut, enim tempore quidem qui cupiditate optio ad a ducimus iusto
						laborum tempora et{" "}
						<a
							className="underline-on-hover"
							href="https://ub.edu.bs"
							target="_blank"
							rel="noreferrer"
						>
							The University of The Bahamas
						</a>{" "}
						eveniet minus vitae? Lorem ipsum dolor sit amet, consectetur
						adipisicing elit. Ab, consequuntur.
					</p>
					<p>
						Ut, enim tempore quidem qui cupiditate optio ad a ducimus iusto
						laborum{" "}
						<a
							className="underline-on-hover"
							target="_blank"
							rel="noreferrer"
							href="https://www.swift.org/"
						>
							Swift
						</a>{" "}
						tempora et{" "}
						<a
							className="underline-on-hover"
							target="_blank"
							rel="noreferrer"
							href="https://www.swift.org/"
						>
							iOS Development
						</a>{" "}
						asperiores culpa aperiam eveniet minus vitae? Lorem ipsum dolor sit
						amet consectetur adipisicing elit. A, vel?
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, enim
						tempore quidem qui cupiditate optio ad a ducimus iusto laborum
						tempora et asperiores culpa aperiam eveniet minus vitae?
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
