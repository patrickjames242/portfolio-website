import emailValidator from "email-validator";
import { Formik, FormikErrors } from "formik";
import { BubbleTextButton } from "helper-views/BubbleTextButton/BubbleTextButton";
import LoadingSpinner from "helper-views/LoadingSpinner/LoadingSpinner";
import React, { useImperativeHandle, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { animated, useTransition } from "react-spring";
import FormField from "../FormField/FormField";
import CheckmarkIcon from "./CheckmarkIcon";
import styles from "./ContactForm.module.scss";
import XIcon from "./XIcon";

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

	const toastRef = useRef<ToastRef>(null);

	return (
		<>
			<Toast ref={toastRef} />
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
		</>
	);
};
export default ContactForm;

interface ToastRef {
	showToast(config: { successful: boolean; message: string }): void;
}

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {}

const Toast = (() => {
	const Toast: React.ForwardRefRenderFunction<ToastRef, ToastProps> = (
		{ ...htmlAttributes },
		ref
	) => {
		const [messageInfo, setMessageInfo] = useState<{
			successful: boolean;
			message: string;
		}>({ successful: true, message: "" });
		const [show, setShow] = useState(false);

		const transitions = useTransition(
			show,
			(() => {
				const from = { transform: "translateY(20px)", opacity: 0 };
				return {
					from,
					enter: { transform: "translateY(0px)", opacity: 1 },
					leave: from,
				};
			})()
		);

		const timerRef = useRef<number | null>(null);

		useImperativeHandle(
			ref,
			() => ({
				showToast(config) {
					timerRef.current && clearTimeout(timerRef.current);
					ReactDOM.unstable_batchedUpdates(() => {
						setMessageInfo(config);
						setShow(true);
					});
					timerRef.current = setTimeout(() => {
						setShow(false);
					}, 4000) as any;
				},
			}),
			[]
		);

		return transitions(
			(transitionStyles, item) =>
				item &&
				ReactDOM.createPortal(
					<animated.div
						className={styles.errorMessageToastHolder}
						style={transitionStyles}
					>
						<div
							{...htmlAttributes}
							className={[
								styles.ErrorMessageToast,
								htmlAttributes.className,
								messageInfo.successful ? undefined : styles.error,
							].asClassString()}
						>
							<div className={styles.topLine} />
							{messageInfo.successful ? <CheckmarkIcon /> : <XIcon />}
							<div className={styles.text}>{messageInfo.message}</div>
						</div>
					</animated.div>,
					window.document.body,
					"ErrorMessageToast"
				)
		);
	};
	return React.memo(React.forwardRef(Toast));
})();
