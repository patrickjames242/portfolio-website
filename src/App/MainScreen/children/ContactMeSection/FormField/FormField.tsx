import { useField } from "formik";
import React, { useState } from "react";
import styles from "./FormField.module.scss";

type FieldType = "single-line" | "multi-line";

interface FormFieldProps<F extends FieldType>
	extends React.HTMLAttributes<
		F extends "single-line" ? HTMLInputElement : HTMLTextAreaElement
	> {
	fieldTitle: string;
	placeholder: string;
	fieldType?: F;
	fieldKey: string;
}

function FormField<F extends FieldType>(
	{
		fieldTitle,
		placeholder,
		fieldType,
		fieldKey,
		...htmlAttributes
	}: FormFieldProps<F>,
	ref: React.ForwardedRef<HTMLDivElement>
): ReturnType<React.FC<FormFieldProps<F>>> {
	const [focused, setFocused] = useState(false);
	const [field, meta] = useField(fieldKey);

	const textInputProps = {
		placeholder,
		...field,
		onFocus: () => setFocused(true),
		onBlur: () => setFocused(false),
	};
	return (
		<div
			ref={ref}
			className={[
				styles.FormField,
				htmlAttributes.className,
				focused ? styles.focused : undefined,
			].asClassString()}
		>
			<div className={styles.inputTitle}>{fieldTitle}</div>
			{(() => {
				switch (fieldType) {
					case "single-line":
						return <input type="text" {...textInputProps} />;
					case "multi-line":
						return <textarea {...textInputProps}></textarea>;
					default:
						return null;
				}
			})()}
			{(() => {
				const message = meta.error?.trim() ?? null;
				if (!meta.touched || message == null || message.length < 1) return null;
				return <div className={styles.errorMessage}>{"*" + message}</div>;
			})()}
		</div>
	);
}

export default React.forwardRef(FormField);
