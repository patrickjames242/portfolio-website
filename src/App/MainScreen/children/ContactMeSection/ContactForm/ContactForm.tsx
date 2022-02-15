import emailValidator from "email-validator";
import { Formik, FormikErrors } from "formik";
import { BubbleTextButton } from "helper-views/BubbleTextButton/BubbleTextButton";
import LoadingSpinner from "helper-views/LoadingSpinner/LoadingSpinner";
import { PresentationItem } from "helpers/AnimationController";
import React, { useImperativeHandle, useRef } from "react";
import FormField from "../FormField/FormField";
import styles from "./ContactForm.module.scss";
import SuccessOrFailureToast, {
	SuccessOrFailureToastRef,
} from "./SuccessOrFailureToast/SuccessOrFailureToast";

export interface ContactFormRef {
	getPresentationItems(): PresentationItem[];
}

export interface ContactFormProps
	extends React.HTMLAttributes<HTMLFormElement> {}

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

const ContactForm: React.ForwardRefRenderFunction<
	ContactFormRef,
	ContactFormProps
> = ({ ...htmlAttributes }, ref) => {
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

	const toastRef = useRef<SuccessOrFailureToastRef>(null);
	const nameFieldRef = useRef<HTMLDivElement>(null);
	const emailFieldRef = useRef<HTMLDivElement>(null);
	const descriptionFieldRef = useRef<HTMLDivElement>(null);
	const submitButtonRef = useRef<HTMLButtonElement>(null);

	useImperativeHandle(
		ref,
		() => ({
			getPresentationItems() {
				const fieldTimeInterval = 0.2;
				return [
					{
						slideUpElement: nameFieldRef.current!,
						secondsTillNextAnimation: fieldTimeInterval,
					},
					{
						slideUpElement: emailFieldRef.current!,
						secondsTillNextAnimation: fieldTimeInterval,
					},
					{ slideUpElement: descriptionFieldRef.current! },
					{ slideUpElement: submitButtonRef.current! },
				];
			},
		}),
		[]
	);

	return (
		<>
			<SuccessOrFailureToast ref={toastRef} />
			<Formik<FormValues>
				initialValues={{ description: "", fullName: "", email: "" }}
				validate={(values) => {
					const keys: (keyof FormValues)[] = [
						"fullName",
						"email",
						"description",
					];
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
					try {
						const result = await fetch(
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
						// throws if the status isn't in the 200's range
						if (Math.floor(result.status / 100) !== 2) throw new Error();
					} catch {
						toastRef.current?.showToast({
							successful: false,
							message: "Could not send message.",
						});
						return;
					}

					toastRef.current?.showToast({
						successful: true,
						message: "The message was sent successfully.",
					});
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
										ref={nameFieldRef}
										fieldType="single-line"
										fieldTitle="What's your full name?"
										placeholder="Full Name"
										fieldKey="fullName"
									/>
									<FormField
										ref={emailFieldRef}
										fieldType="single-line"
										fieldTitle="What's your email address?"
										placeholder="Email"
										fieldKey="email"
									/>
								</div>
								<FormField
									ref={descriptionFieldRef}
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
									ref={submitButtonRef}
									style={
										isSubmitting ? { opacity: 0, pointerEvents: "none" } : {}
									}
									titleText="Send Message"
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
		</>
	);
};

export default React.forwardRef(ContactForm);
