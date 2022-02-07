import { BubbleTextAnchor } from "helper-views/BubbleTextButton/BubbleTextButton";
import React from "react";
import { appRoutes } from "../helpers";
import NavLink from "../NavLink/NavLink";
import styles from "./NavBarVertical.module.scss";

export interface NavBarVerticalProps
	extends React.HTMLAttributes<HTMLDivElement> {}

const NavBarVertical: React.FC<NavBarVerticalProps> = ({
	...htmlAttributes
}: NavBarVerticalProps) => {
	return (
		<div
			{...htmlAttributes}
			className={[
				styles.NavBarVertical,
				htmlAttributes.className,
			].asClassString()}
		>
			{appRoutes.map(({ routeType, name }, i) => (
				<NavLink
					key={name}
					routeType={routeType}
					style={{ fontSize: 21, fontWeight: 400 }}
				></NavLink>
			))}
			<BubbleTextAnchor
				titleText="Résumé"
				className={styles.resumeButton}
				target="_blank"
				href="resume.pdf"
			></BubbleTextAnchor>
		</div>
	);
};

export default NavBarVertical;
