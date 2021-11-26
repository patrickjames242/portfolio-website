import React from "react";

export function classNames(...classes: (string | null | undefined)[]) {
	return classes.filter((x) => typeof x === "string").join(" ");
}

export type HTMLAttributes<HTMLElement> = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLElement>,
	HTMLElement
>;
