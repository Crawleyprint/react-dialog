'use client';

import styles from '../app.module.css';
import { ShareLinks } from './ShareLinks';

export const Footer = () => {
  return (
    <footer>
      <section>
        <nav className={styles.navigation}>
          <a
            href="https://github.com/Crawleyprint/react-dialog"
            target="_blank"
            className={styles['plain-link']}
          >
            Github
          </a>
          <span className={styles.separator}>/</span>
          <a
            href="https://www.npmjs.com/package/@crawleyprint/react-dialog"
            target="_blank"
            className={styles['plain-link']}
          >
            npm
          </a>
          <ShareLinks />
        </nav>
        <p className={styles.separator}>
          &copy; Copyright {new Date().getFullYear()} @crawleyprint
        </p>
      </section>
    </footer>
  );
};
