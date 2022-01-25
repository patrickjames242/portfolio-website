import { MainScreenContext } from "App/helpers";
import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TriangleIconSVG from "../../../../helper-views/svg/TriangleSVG";
import {
	getInfoForRoutePath,
	getInfoForRouteType,
	RouteType,
} from "../helpers";
import styles from "./NavLink.module.scss";

export interface NavLinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	routeType: RouteType;
}

const NavLink: React.FC<NavLinkProps> = ({
	routeType,
	...reactProps
}: NavLinkProps) => {
	const location = useLocation();
	const navigate = useNavigate();
	const routeInfo = getInfoForRouteType(routeType);
	const mainScreenContext = useContext(MainScreenContext);
	return (
		<a
			{...reactProps}
			className={[
				styles.NavLink,
				// selected ? styles.selected : undefined,
				reactProps.className,
			].asClassString()}
			href={routeInfo.path}
			onClick={(event) => {
				event.preventDefault();
				if (getInfoForRoutePath(location.pathname)?.routeType === routeType) {
					mainScreenContext.animateToRouteType(routeType);
				} else {
					navigate(routeInfo.path);
				}
				mainScreenContext.setMenuDrawerOpened(false);
			}}
		>
			<TriangleIconSVG />
			<div className={styles.text}>{routeInfo.name}</div>
		</a>
	);
};

export default NavLink;
