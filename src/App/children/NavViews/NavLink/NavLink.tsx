import React from "react";
import styles from "./NavLink.module.scss";
import { Link } from "react-router-dom";
import TriangleIconSVG from "../../../../helper-views/svg/TriangleSVG";

export interface NavLinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	selected: boolean;
	to: string;
	name: string;
}

const NavLink: React.FC<NavLinkProps> = ({
	selected,
	to,
	name,
	...reactProps
}: NavLinkProps) => {
	return (
		<Link
			{...reactProps}
			className={[
				styles.NavLink,
				selected ? styles.selected : undefined,
				reactProps.className,
			].asClassString()}
			to={to}
		>
			<TriangleIconSVG />
			<div className={styles.text}>{name}</div>
		</Link>
	);
};

export default NavLink;
