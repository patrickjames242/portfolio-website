import React from 'react';
import GithubIcon from './GithubIcon';
import LinkedInIcon from './LinkedInIcon';
import MailIcon from './MailIcon';
import styles from './PageFooter.module.scss';

export interface PageFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const PageFooter: React.FC<PageFooterProps> = ({
  ...htmlAttributes
}: PageFooterProps) => {
  return (
    <footer
      {...htmlAttributes}
      className={[styles.PageFooter, htmlAttributes.className].asClassString()}
    >
      <div className={styles.content}>
        <div className={styles.icons}>
          {[
            { svg: <MailIcon />, href: 'mailto:contact@patrickhanna.dev' },
            { svg: <GithubIcon />, href: 'https://github.com/patrickjames242' },
            {
              svg: <LinkedInIcon />,
              href: 'https://www.linkedin.com/in/patrick-hanna-581b2415a/',
            },
          ].map((x) => (
            <a
              className="highlight-on-hover"
              href={x.href}
              target="_blank"
              rel="noreferrer"
              key={x.href}
            >
              {x.svg}
            </a>
          ))}
        </div>
        <div className={styles.built}>
          <a
            className="underline-on-hover"
            href="https://github.com/patrickjames242/portfolio-website"
            target="_blank"
            rel="noreferrer"
          >
            Built
          </a>{' '}
          with ♥ by Patrick Hanna
        </div>
        <div className={styles.designed}>
          Design inspired by{' '}
          <a
            className="underline-on-hover"
            href="https://brittanychiang.com"
            target="_blank"
            rel="noreferrer"
          >
            {"Brittany Chiang's site"}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
