import BubbleTextButton from "helper-views/BubbleTextButton/BubbleTextButton";
import React from "react";
import { appRoutes } from "../helpers";
import XIconSVG from "../NavDrawer/XIconSVG";
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
			{appRoutes.map(({ path, name }, i) => (
				<NavLink
					key={name}
					selected={i === 0}
					to={path}
					name={name}
					style={{ fontSize: 21, fontWeight: 400 }}
				></NavLink>
			))}
			<BubbleTextButton
				title="Resume"
				className={styles.resumeButton}
			></BubbleTextButton>
		</div>
	);
};

export default NavBarVertical;
