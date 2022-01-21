import BubbleTextButton from "helper-views/BubbleTextButton/BubbleTextButton";
import React, { ChangeEventHandler, useMemo, useRef, useState } from "react";
import styles from "./ContactMeSection.module.scss";

export interface ContactMeSectionProps
	extends React.HTMLAttributes<HTMLDivElement> {}

const ContactMeSection: React.FC<ContactMeSectionProps> = ({
	...htmlAttributes
}: ContactMeSectionProps) => {
	return (
		<div
			{...htmlAttributes}
			className={[
				styles.ContactMeSection,
				htmlAttributes.className,
			].asClassString()}
		>
			<ContactSectionHeader />
			<ContactForm />
		</div>
	);
};

export default ContactMeSection;

interface ContactSectionHeaderProps
	extends React.HTMLAttributes<HTMLDivElement> {}

const ContactSectionHeader: React.FC<ContactSectionHeaderProps> = ({
	...htmlAttributes
}: ContactSectionHeaderProps) => {
	return (
		<div
			{...htmlAttributes}
			className={[
				styles.ContactSectionHeader,
				htmlAttributes.className,
			].asClassString()}
		>
			<div className={styles.subtitle}>Like what you see?</div>
			<h2 className={styles.title}>Get In Touch</h2>
			<div className={styles.description}>
				You can reach me at{" "}
				<a
					href="mailto:contact@patrickhanna.dev"
					className="underline-on-hover"
				>
					contact@patrickhanna.dev
				</a>
				. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum minus
				dksl vitae velit consequatur sapiente saepe akdow.
			</div>
		</div>
	);
};

interface ContactFormProps extends React.HTMLAttributes<HTMLFormElement> {}

const ContactForm: React.FC<ContactFormProps> = ({
	...htmlAttributes
}: ContactFormProps) => {
	type FormValues = {
		fullName: string;
		email: string;
		description: string;
	};

	const formRef = useRef<HTMLFormElement>(null);
	const [touched, setTouched] = useState(false);
	const [formValue, setFormValue] = useState<FormValues>(
		Object.freeze({
			fullName: "",
			email: "",
			description: "",
		})
	);

	const fieldInfo = useMemo(() => {
		function getFieldInfo(fieldName: keyof FormValues) {
			return {
				value: formValue[fieldName],
				errorMessage: (() => {
					const value = formValue[fieldName];
					if (typeof value !== "string" || value.length < 1)
						return "This field is required";
					else return;
				})(),
				onValueChange: (value: string) => {
					setFormValue(
						Object.freeze({
							...formValue,
							[fieldName]: value,
						})
					);
				},
			};
		}
		const result: Record<keyof FormValues, ReturnType<typeof getFieldInfo>> = {
			fullName: getFieldInfo("fullName"),
			email: getFieldInfo("email"),
			description: getFieldInfo("description"),
		};
		return result;
	}, [formValue]);

	const isFormValid = useMemo(() => {
		for (const key in fieldInfo) {
			if (fieldInfo[key as keyof FormValues].errorMessage != null) return false;
		}
		return true;
	}, [fieldInfo]);

	return (
		<form
			ref={formRef}
			{...htmlAttributes}
			className={[styles.ContactForm, htmlAttributes.className].asClassString()}
			onSubmit={async (event) => {
				setTouched(true);
				event.nativeEvent.preventDefault();
				if (isFormValid === false) return;
				const result = await fetch(
					"https://hopeful-bhaskara-e203f7.netlify.app/.netlify/functions/email",
					{
						method: "POST",
						body: JSON.stringify({
							fullName: fieldInfo.fullName,
							email: fieldInfo.email,
							description: fieldInfo.description,
						}),
					}
				);
				console.log(result.json());
			}}
		>
			<div className={styles.formColumns}>
				<div className={styles.col1}>
					<FormField
						fieldType="single-line"
						fieldTitle="What's your full name?"
						placeholder="Full Name"
						errorMessage={fieldInfo.fullName.errorMessage}
						value={fieldInfo.fullName.value}
						onValueChanged={fieldInfo.fullName.onValueChange}
						touched={touched}
					/>
					<FormField
						fieldType="single-line"
						fieldTitle="What's your email address?"
						placeholder="Email"
						errorMessage={fieldInfo.email.errorMessage}
						value={fieldInfo.email.value}
						onValueChanged={fieldInfo.email.onValueChange}
						touched={touched}
					/>
				</div>
				<FormField
					fieldType="multi-line"
					fieldTitle="What do you want to talk about?"
					placeholder="Message"
					className={styles.message}
					errorMessage={fieldInfo.description.errorMessage}
					value={fieldInfo.description.value}
					onValueChanged={fieldInfo.description.onValueChange}
					touched={touched}
				/>
			</div>
			<BubbleTextButton
				title="Send Message"
				className={styles.BubbleTextButton}
				onClick={() => formRef?.current?.requestSubmit()}
			/>
		</form>
	);
};

type FieldType = "single-line" | "multi-line";

interface FormFieldProps<F extends FieldType>
	extends React.HTMLAttributes<
		F extends "single-line" ? HTMLInputElement : HTMLTextAreaElement
	> {
	fieldTitle: string;
	placeholder: string;
	fieldType?: F;
	errorMessage?: string | null;
	touched?: boolean;
	value: string;
	onValueChanged: (value: string) => void;
}

function FormField<F extends FieldType>({
	fieldTitle,
	placeholder,
	fieldType,
	errorMessage,
	touched: propsTouched,
	value,
	onValueChanged,
	...htmlAttributes
}: FormFieldProps<F>): ReturnType<React.FC<FormFieldProps<F>>> {
	const [focused, setFocused] = useState(false);
	const textInputProps = {
		placeholder,
		onFocus: () => setFocused(true),
		onBlur: () => setFocused(false),
		value,
		onChange: (
			event: Parameters<
				ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
			>[0]
		) => {
			onValueChanged(event.target.value);
		},
	};
	const touched = propsTouched ?? true;
	return (
		<div
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
				const message = errorMessage?.trim() ?? null;
				if (!touched || message == null || message.length < 1) return null;
				return <div className={styles.errorMessage}>{"*" + message}</div>;
			})()}
		</div>
	);
}
