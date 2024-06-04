import { useEffect, useRef, useState } from 'react';
import type { FC, ReactNode, MouseEvent } from 'react';

type DialogProps = {
  targetLabel: string;
  closeBtnLabel?: string;
  type?: 'dialog' | 'flyout';
  onClose?: () => void;
  children?: ReactNode;
};
export const Dialog: FC<DialogProps> = ({
  targetLabel,
  closeBtnLabel = 'Close',
  type = 'dialog',
  children,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  function positionFlyout() {
    if (!triggerRef.current) return;
    const { top, left, width, height } =
      triggerRef.current.getBoundingClientRect();
    const t = top + height + 10;
    const l = left - width / 2;
    setPosition({ top: t, left: l });
  }

  function showDialog(event: MouseEvent<HTMLButtonElement>) {
    console.log(event);
    if (!dialogRef?.current) return;
    if (type === 'flyout') positionFlyout();
    dialogRef.current.addEventListener('close', onDialogClose);
    dialogRef.current.showModal();
  }
  function onDialogClose() {
    onClose?.();
    dialogRef?.current?.close();
    dialogRef?.current?.removeEventListener('close', onDialogClose);
  }

  useEffect(() => {
    window.addEventListener('resize', positionFlyout);
    window.addEventListener('scroll', positionFlyout);
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
        className={`btn dialog-open ${type}-target`}
        tabIndex={0}
      >
        {targetLabel}
      </button>
      <dialog
        ref={dialogRef}
        className={`dialog ${type}-dialog`}
        style={type === 'flyout' ? { ...position } : { ...{} }}
      >
        {children}
        <button tabIndex={0} className="btn" onClick={onDialogClose}>
          {closeBtnLabel}
        </button>
      </dialog>
    </div>
  );
};
