import SectionHeader from "helper-views/SectionHeader/SectionHeader";
import React from "react";
import styles from "./AboutMeSection.module.scss";

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
			<SectionHeader titleText="Let Me Introduce Myself" />
			<div className={styles.content}></div>
		</div>
	);
};

export default React.forwardRef(AboutMeSection);
