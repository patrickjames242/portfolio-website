import {
  PresentationItem,
  usePresentationController,
} from 'helpers/AnimationController';
import { useCallbackRef } from 'helpers/hooks';
import React, { useEffect, useImperativeHandle, useRef } from 'react';
import ContactForm, { ContactFormRef } from './ContactForm/ContactForm';
import styles from './ContactMeSection.module.scss';

export interface ContactMeSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ContactMeSection: React.ForwardRefRenderFunction<
  HTMLDivElement,
  ContactMeSectionProps
> = ({ ...htmlAttributes }, forwardedRef) => {
  const rootRef = useCallbackRef(forwardedRef);
  const sectionHeaderRef = useRef<ContactSectionHeaderRef>(null);
  const contactFormRef = useRef<ContactFormRef>(null);

  const presentationController = usePresentationController();

  useEffect(() => {
    presentationController.addSection({
      sectionRoot: rootRef.getLatest()!,
      threshold: 0.1,
      presentationItems: [
        ...sectionHeaderRef.current!.getPresentationItems(),
        ...contactFormRef.current!.getPresentationItems(),
      ],
    });
  }, [presentationController, rootRef]);

  return (
    <div
      {...htmlAttributes}
      ref={rootRef}
      className={[
        styles.ContactMeSection,
        htmlAttributes.className,
      ].asClassString()}
    >
      <ContactSectionHeader ref={sectionHeaderRef} />
      <ContactForm ref={contactFormRef} />
    </div>
  );
};

export default React.forwardRef(ContactMeSection);

interface ContactSectionHeaderRef {
  getPresentationItems(): PresentationItem[];
}

interface ContactSectionHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ContactSectionHeader = (() => {
  const ContactSectionHeader: React.ForwardRefRenderFunction<
    ContactSectionHeaderRef,
    ContactSectionHeaderProps
  > = ({ ...htmlAttributes }, ref) => {
    const subtitleRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const description = useRef<HTMLParagraphElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        getPresentationItems() {
          const interval = 0.3;
          return [
            {
              slideUpElement: subtitleRef.current!,
              secondsTillNextAnimation: interval,
            },
            {
              slideUpElement: titleRef.current!,
              secondsTillNextAnimation: interval,
            },
            { slideUpElement: description.current! },
          ];
        },
      }),
      [],
    );

    return (
      <div
        {...htmlAttributes}
        className={[
          styles.ContactSectionHeader,
          htmlAttributes.className,
        ].asClassString()}
      >
        <div ref={subtitleRef} className={styles.subtitle}>
          Like what you see?
        </div>
        <h2 ref={titleRef} className={styles.title}>
          Get In Touch
        </h2>
        <p ref={description} className={styles.description}>
          You can send me an email at{' '}
          <a
            href="mailto:contact@patrickhanna.dev"
            className="underline-on-hover"
          >
            contact@patrickhanna.dev.
          </a>{' '}
          Alternatively, you can shoot me a quick message using the form below.
          I'm excited to hear from you! 😄
        </p>
      </div>
    );
  };
  return React.forwardRef(ContactSectionHeader);
})();
