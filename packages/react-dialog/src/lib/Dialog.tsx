import { useEffect, useRef, useState } from 'react';
import type { FC, ReactNode, MouseEvent } from 'react';

import styles from './react-dialog.module.css';
console.log(styles);

type DialogProps = {
  targetLabel: string;
  closeBtnLabel?: string;
  flyout?: 'up' | 'down' | 'left' | 'bottom' | true;
  onClose?: () => void;
  children?: ReactNode;
  open?: boolean;
};

export const Dialog: FC<DialogProps> = ({
  targetLabel,
  closeBtnLabel = 'Close',
  children,
  onClose,
  open = false,
  flyout = false,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, margin: 0 });

  function positionFlyout() {
    if (!triggerRef.current) return;
    if (!dialogRef.current) return;
    const { top, left, height } = triggerRef.current.getBoundingClientRect();
    const { width: dialogWidth } = dialogRef.current.getBoundingClientRect();
    const t = top + height + 10;
    let l = left - dialogWidth / 2;
    if (l < 0) l = 0;
    setPosition({ top: t, left: l, margin: 0 });
  }

  function showDialog() {
    if (!dialogRef?.current) return;
    dialogRef.current.showModal();
    if (flyout) positionFlyout();
    dialogRef.current.addEventListener('close', onDialogClose);
  }

  function onDialogClose() {
    onClose?.();
    dialogRef?.current?.close();
    dialogRef?.current?.removeEventListener('close', onDialogClose);
  }

  useEffect(() => {
    window.addEventListener('resize', positionFlyout);
    window.addEventListener('scroll', positionFlyout);

    if (open) {
      dialogRef?.current?.showModal();
      if (flyout) positionFlyout();
    }
    return () => {
      window.removeEventListener('resize', positionFlyout);
      window.removeEventListener('scroll', positionFlyout);
    };
  }, []);
  return (
    <div>
      <button
        ref={triggerRef}
        type="button"
        onClick={showDialog}
        className={`btn dialog-open ${flyout ? 'flyout-target' : ''}`}
        tabIndex={0}
      >
        {targetLabel}
      </button>
      <dialog
        ref={dialogRef}
        className={`${styles.dialog}`}
        style={flyout ? { ...position } : { ...{} }}
      >
        {children}
        <button tabIndex={0} className="btn" onClick={onDialogClose}>
          {closeBtnLabel}
        </button>
      </dialog>
    </div>
  );
};
