import { classNames, HTMLAttributes } from "helpers/general";
import styles from "./<FTName>.module.scss";

export interface <FTName>Props
	extends HTMLAttributes <HTMLDivElement> {
      
}

function <FTName>(props: <FTName>Props) {
	return (
		<div
			{...props}
			className={classNames(styles.<FTName>, props.className)}
		></div>
	);
}

export default <FTName>;
