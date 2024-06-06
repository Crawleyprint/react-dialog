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

  const { openDialog, closeDialog, styles, arrowStyles } = useDialog({
    dialog: dialogRef.current,
    trigger: triggerRef.current,
    style,
    placement,
    isOpen,
    arrowEl: arrowEl.current,
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
        data-testid="dialog-body"
        ref={dialogRef}
        className={`${css.dialog} ${placement ? css['flyout-dialog'] : ''}`}
        style={{ ...styles }}
      >
        {placement && (
          <span
            className={css.arrow}
            ref={arrowEl}
            style={{ ...arrowStyles }}
          ></span>
        )}
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
