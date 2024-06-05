import { useEffect, useRef, useState } from 'react';
import type { FC, ReactNode, CSSProperties } from 'react';

import css from './react-dialog.module.css';

type DialogProps = {
  targetLabel: string;
  closeBtnLabel?: string;
  flyout?: 'up' | 'down' | 'left' | 'bottom' | true;
  onClose?: () => void;
  children?: ReactNode;
  open?: boolean;
  style?: CSSProperties;
};

const defaultStyle = {};

export const Dialog: FC<DialogProps> = ({
  targetLabel,
  closeBtnLabel = 'Close',
  children,
  onClose,
  open = false,
  flyout = false,
  style = defaultStyle,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [styles, setStyles] = useState<Record<string, unknown>>({
    top: 0,
    left: 0,
    ...style,
  });

  function positionFlyout() {
    if (!triggerRef.current) return;
    if (!dialogRef.current) return;
    const { top, left, height } = triggerRef.current.getBoundingClientRect();
    const { width: dialogWidth } = dialogRef.current.getBoundingClientRect();
    const t = top + height + 10;
    let l = left - dialogWidth / 2;
    if (l < 0) l = 0;
    setStyles((oldStyles) => ({ ...oldStyles, top: t, left: l, margin: 0 }));
  }

  function showDialog() {
    if (!dialogRef?.current) return;
    dialogRef.current?.showModal();
    if (flyout) positionFlyout();
    dialogRef.current.addEventListener('close', hideDialog);
  }

  function hideDialog() {
    onClose?.();
    dialogRef?.current?.close();
    dialogRef?.current?.removeEventListener('close', hideDialog);
  }

  useEffect(() => {
    window.addEventListener('resize', positionFlyout);
    window.addEventListener('scroll', positionFlyout);

    setStyles((oldStyles) => ({ ...oldStyles, style }));

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
        data-testid="dialog-trigger"
        ref={triggerRef}
        type="button"
        onClick={showDialog}
        className={`btn dialog-open ${flyout ? 'flyout-target' : ''}`}
        tabIndex={0}
      >
        {targetLabel}
      </button>
      <dialog
        data-testid="dialog-body"
        ref={dialogRef}
        className={`${css.dialog}`}
        style={{ ...styles }}
      >
        {children}
        <button
          tabIndex={0}
          className="btn"
          onClick={hideDialog}
          data-testid="dialog-close"
        >
          {closeBtnLabel}
        </button>
      </dialog>
    </div>
  );
};
