import React from 'react';
import styles from "./<FTName>.module.scss";

export interface <FTName>Props
	extends React.HTMLAttributes<HTMLDivElement> {
      
}

const <FTName>: React.FC<<FTName>Props> = ({...htmlAttributes}: <FTName>Props) => {
	return (
		<div
			{...htmlAttributes}
			className={[styles.<FTName>, htmlAttributes.className].asClassString()}
		></div>
	);
}

export default <FTName>;
