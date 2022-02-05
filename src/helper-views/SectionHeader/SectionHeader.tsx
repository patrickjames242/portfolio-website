import TriangleIconSVG from "helper-views/svg/TriangleSVG";
import React from "react";
import styles from "./SectionHeader.module.scss";

export interface SectionHeaderProps
	extends React.HTMLAttributes<HTMLDivElement> {
	titleText: string;
	includeLine?: boolean;
}

const SectionHeader: React.ForwardRefRenderFunction<
	HTMLHeadingElement,
	SectionHeaderProps
> = ({ titleText, includeLine, ...htmlAttributes }, ref) => {
	return (
		<h3
			{...htmlAttributes}
			className={[
				styles.SectionHeader,
				htmlAttributes.className,
			].asClassString()}
			ref={ref}
		>
			<TriangleIconSVG />
			<div className={styles.titleText}>{titleText}</div>
			{(includeLine ?? true) && <div className={styles.line}></div>}
		</h3>
	);
};

export default React.forwardRef(SectionHeader);
