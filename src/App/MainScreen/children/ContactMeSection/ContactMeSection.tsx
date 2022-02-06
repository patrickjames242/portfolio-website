import React from "react";
import ContactForm from "./ContactForm/ContactForm";
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
				You can send me an email at{" "}
				<a
					href="mailto:contact@patrickhanna.dev"
					className="underline-on-hover"
				>
					contact@patrickhanna.dev.
				</a>{" "}
				Alternatively, you can shoot me a quick message using the form below.
				I'm excited to hear from you! 😄
			</div>
		</div>
	);
};
