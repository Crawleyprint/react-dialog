import { useRef } from 'react';
import type { FC } from 'react';

import css from './react-dialog.module.css';
import { useDialog } from './hooks/useDialog';

const defaultStyle = {};

export const Dialog: FC<Crawleyprint.DialogProps> = ({
  targetLabel,
  closeBtnLabel = 'Close',
  children,
  onClose = () => {},
  isOpen = false,
  style = defaultStyle,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { openDialog, closeDialog } = useDialog({
    dialog: dialogRef.current,
    style,
    isOpen,
  });

  function showDialog() {
    openDialog();
  }

  function hideDialog() {
    onClose?.();
    closeDialog();
  }
  return (
    <>
      <button
        data-testid="dialog-trigger"
        type="button"
        onClick={showDialog}
        className={`btn dialog-open}`}
        tabIndex={0}
      >
        {targetLabel}
      </button>
      <dialog
        style={{ ...style }}
        data-testid="dialog-body"
        ref={dialogRef}
        className={`${css.dialog}`}
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
    </>
  );
};
