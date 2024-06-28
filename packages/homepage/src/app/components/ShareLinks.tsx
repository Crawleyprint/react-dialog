'use client';

import { useEffect, useState } from 'react';
import styles from '../app.module.css';

export const ShareLinks = () => {
  const [canShare, setCanShare] = useState(false);
  useEffect(() => {
    setCanShare(navigator && typeof navigator?.share === 'function');
  }, []);
  function share() {
    if (navigator) navigator?.share?.({ url: window.location.href });
  }
  function copyUrl() {
    if (navigator) navigator?.clipboard.writeText(window.location.href);
  }
  return (
    <>
      {canShare ? (
        <>
          <span className={styles.separator}>/</span>
          <span className={styles['plain-link']} onClick={share}>
            Share
          </span>
        </>
      ) : null}
      <span className={styles.separator}>/</span>
      <span className={styles['plain-link']} onClick={copyUrl}>
        Copy URL
      </span>
    </>
  );
};
