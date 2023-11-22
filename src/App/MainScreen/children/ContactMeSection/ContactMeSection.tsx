import {
  PresentationItem,
  usePresentationController,
} from 'helpers/AnimationController';
import { useEffect, useImperativeHandle, useRef } from 'react';
import { extend } from 'react-extend-components';
import ContactForm, { ContactFormRef } from './ContactForm/ContactForm';
import styles from './ContactMeSection.module.scss';

const ContactMeSection = extend('div')((Root) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const sectionHeaderRef = useRef<ContactSectionHeaderRef>(null);
  const contactFormRef = useRef<ContactFormRef>(null);

  const presentationController = usePresentationController();

  useEffect(() => {
    presentationController.addSection({
      sectionRoot: rootRef.current!,
      threshold: 0.1,
      presentationItems: [
        ...sectionHeaderRef.current!.getPresentationItems(),
        ...contactFormRef.current!.getPresentationItems(),
      ],
    });
  }, [presentationController, rootRef]);

  return (
    <Root ref={rootRef} className={styles.ContactMeSection}>
      <ContactSectionHeader ref={sectionHeaderRef} />
      <ContactForm ref={contactFormRef} />
    </Root>
  );
});

export default ContactMeSection;

interface ContactSectionHeaderRef {
  getPresentationItems(): PresentationItem[];
}

const ContactSectionHeader = extend('div')<{}, ContactSectionHeaderRef>((
  Root,
  { ref },
) => {
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
    <Root className={styles.ContactSectionHeader}>
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
        {
          "Alternatively, you can shoot me a quick message using the form below. I'm excited to hear from you! 😄"
        }
      </p>
    </Root>
  );
});
