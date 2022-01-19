import BubbleTextButton from "helper-views/BubbleTextButton/BubbleTextButton";
import React, { useState } from "react";
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
			{/* <BubbleTextButton
				title="Send me an email"
				className={styles.BubbleTextButton}
			/> */}
		</div>
	);
};

interface ContactFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContactForm: React.FC<ContactFormProps> = ({
	...htmlAttributes
}: ContactFormProps) => {
	return (
		<div
			{...htmlAttributes}
			className={[styles.ContactForm, htmlAttributes.className].asClassString()}
		>
			<div className={styles.formColumns}>
				<div className={styles.col1}>
					<FormField
						fieldType="single-line"
						fieldTitle="What's your full name?"
						placeholder="Full Name"
					/>
					<FormField
						fieldType="single-line"
						fieldTitle="What's your email address?"
						placeholder="Email"
					/>
				</div>

				<FormField
					fieldType="multi-line"
					fieldTitle="What do you want to talk about?"
					placeholder="Message"
					className={styles.message}
				/>
			</div>
			<BubbleTextButton
				title="Send Message"
				className={styles.BubbleTextButton}
			/>
		</div>
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
}

function FormField<F extends FieldType>({
	fieldTitle,
	placeholder,
	fieldType,
	...htmlAttributes
}: FormFieldProps<F>): ReturnType<React.FC<FormFieldProps<F>>> {
	const [focused, setFocused] = useState(false);
	const textInputProps = {
		placeholder,
		onFocus: () => setFocused(true),
		onBlur: () => setFocused(false),
	};
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
		</div>
	);
}
