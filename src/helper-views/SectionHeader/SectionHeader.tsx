import TriangleIconSVG from "helper-views/svg/TriangleSVG";
import React from "react";
import styles from "./SectionHeader.module.scss";

export interface SectionHeaderProps
	extends React.HTMLAttributes<HTMLDivElement> {
	titleText: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
	titleText,
	...htmlAttributes
}: SectionHeaderProps) => {
	return (
		<h2
			{...htmlAttributes}
			className={[
				styles.SectionHeader,
				htmlAttributes.className,
			].asClassString()}
		>
			<TriangleIconSVG />
			<div className={styles.titleText}>{titleText}</div>
			<div className={styles.line}></div>
		</h2>
	);
};

export default SectionHeader;
