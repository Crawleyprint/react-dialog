import { useRef } from 'react';
import type { FC, ReactNode, CSSProperties } from 'react';

import css from './react-dialog.module.css';
import { useDialog } from './hooks/useDialog';

type DialogProps = {
  targetLabel: string;
  closeBtnLabel?: string;
  placement?: 'up' | 'down' | 'left' | 'right';
  onClose?: () => void;
  children?: ReactNode;
  isOpen?: boolean;
  style?: CSSProperties;
};

const defaultStyle = {};

export const Dialog: FC<DialogProps> = ({
  targetLabel,
  closeBtnLabel = 'Close',
  children,
  onClose = () => {},
  isOpen = false,
  placement = undefined,
  style = defaultStyle,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const arrowEl = useRef<HTMLElement>(null);

  const { openDialog, closeDialog } = useDialog({
    dialog: dialogRef.current,
    trigger: triggerRef.current,
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
    <div>
      <button
        data-testid="dialog-trigger"
        ref={triggerRef}
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
        className={`${css.dialog} ${placement ? css['flyout-dialog'] : ''}`}
      >
        {placement && <span className={css.arrow} ref={arrowEl}></span>}
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
