'use client';

import styles from '../app.module.css';

const canShare = typeof navigator?.share === 'function';
function share() {
  navigator?.share?.({ url: window.location.href });
}
function copyUrl() {
  navigator?.clipboard.writeText(window.location.href);
}
export const ShareLinks = () => {
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
