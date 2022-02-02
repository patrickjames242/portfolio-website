import emailValidator from "email-validator";
import { Formik, FormikErrors, useField } from "formik";
import { BubbleTextButton } from "helper-views/BubbleTextButton/BubbleTextButton";
import LoadingSpinner from "helper-views/LoadingSpinner/LoadingSpinner";
import React, { useState } from "react";
import styles from "./ContactMeSection.module.scss";

export interface ContactMeSectionProps
	extends React.HTMLAttributes<HTMLDivElement> {}

const ContactMeSection: React.ForwardRefRenderFunction<
	HTMLDivElement,
	ContactMeSectionProps
> = ({ ...htmlAttributes }, ref) => {
	return (
		<div
			{...htmlAttributes}
			ref={ref}
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

export default React.forwardRef(ContactMeSection);

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

type Validator = (value: string) => { errorMessage: string | null };

const Validators = (() => {
	const required: Validator = (value) => {
		return {
			errorMessage:
				typeof value !== "string" || value.trim().length < 1
					? "This field is required"
					: null,
		};
	};
	const email: Validator = (value) => {
		return {
			errorMessage:
				typeof value === "string" &&
				value.length >= 1 &&
				emailValidator.validate(value) === false
					? "This field must contain a valid email."
					: null,
		};
	};
	return { required, email };
})();

const ContactForm: React.FC<ContactFormProps> = ({
	...htmlAttributes
}: ContactFormProps) => {
	type FormValues = {
		fullName: string;
		email: string;
		description: string;
	};

	const validatorsForFields: Record<keyof FormValues, Validator[]> = {
		fullName: [Validators.required],
		email: [Validators.required, Validators.email],
		description: [Validators.required],
	};

	return (
		<Formik<FormValues>
			initialValues={{ description: "", fullName: "", email: "" }}
			validate={(values) => {
				const keys: (keyof FormValues)[] = ["fullName", "email", "description"];
				return keys.reduce<FormikErrors<FormValues>>((previous, formKey) => {
					const validators = validatorsForFields[formKey];
					for (const validator of validators) {
						const errorMessage = validator(values[formKey]).errorMessage;
						if (errorMessage) previous[formKey] = errorMessage;
					}
					return previous;
				}, {});
			}}
			onSubmit={async (values, { setValues, setTouched }) => {
				await fetch(
					"https://hopeful-bhaskara-e203f7.netlify.app/.netlify/functions/email",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							fullName: values.fullName.trim(),
							email: values.email.trim(),
							description: values.description.trim(),
						}),
					}
				);
				setValues({ email: "", description: "", fullName: "" });
				setTouched({ email: false, description: false, fullName: false });
			}}
		>
			{({ handleSubmit, isSubmitting, setTouched }) => {
				return (
					<form
						{...htmlAttributes}
						className={[
							styles.ContactForm,
							htmlAttributes.className,
						].asClassString()}
						onSubmit={handleSubmit}
					>
						<div className={styles.formColumns}>
							<div className={styles.col1}>
								<FormField
									fieldType="single-line"
									fieldTitle="What's your full name?"
									placeholder="Full Name"
									fieldKey="fullName"
								/>
								<FormField
									fieldType="single-line"
									fieldTitle="What's your email address?"
									placeholder="Email"
									fieldKey="email"
								/>
							</div>
							<FormField
								fieldType="multi-line"
								fieldTitle="What do you want to talk about?"
								placeholder="Message"
								className={styles.message}
								fieldKey="description"
							/>
						</div>
						<div className={styles.buttonHolder}>
							{isSubmitting && (
								<LoadingSpinner className={styles.LoadingSpinner} />
							)}
							<BubbleTextButton
								style={
									isSubmitting ? { opacity: 0, pointerEvents: "none" } : {}
								}
								title="Send Message"
								type="submit"
								onClick={() => {
									setTouched({
										fullName: true,
										description: true,
										email: true,
									});
								}}
							/>
						</div>
					</form>
				);
			}}
		</Formik>
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
	fieldKey: string;
}

function FormField<F extends FieldType>({
	fieldTitle,
	placeholder,
	fieldType,
	fieldKey,
	...htmlAttributes
}: FormFieldProps<F>): ReturnType<React.FC<FormFieldProps<F>>> {
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
