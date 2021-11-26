import BubbleTextButton from "helper-views/BubbleTextButton/BubbleTextButton";
import { classNames, HTMLAttributes } from "helpers/general";
import BracketsSVG from "./brackets-icon";
import styles from "./NavBar.module.scss";
import TriangleIconSVG from "./TriangleSVG";

export interface NavBarProps extends HTMLAttributes<HTMLDivElement> {}

function NavBar({ title, ...htmlProps }: NavBarProps) {
	return (
		<div
			{...htmlProps}
			className={classNames(styles.NavBar, htmlProps.className)}
		>
			<div className={styles.nameBox}>
				<BracketsSVG />
				<div className={styles.nameText}>
					<span className={styles.firstName}>Patrick</span>{" "}
					<span className={styles.lastName}>Hanna</span>
				</div>
			</div>
			<div className={styles.rightSide}>
				{["Home", "About Me", "Projects", "Contact Me"].map((x, i) => (
					<div
						className={classNames(
							styles.navLink,
							i === 0 ? styles.selected : undefined
						)}
					>
						<TriangleIconSVG />
						<div className={styles.text}>{x}</div>
					</div>
				))}
				<BubbleTextButton className={styles.resumeButton} title="Resume" />
			</div>
		</div>
	);
}

export default NavBar;
