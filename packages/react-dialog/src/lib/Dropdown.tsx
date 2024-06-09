import { FC, useRef } from 'react';
import { shift, offset, flip, arrow } from '@floating-ui/react-dom';
import { useDropdown } from './hooks/useDropdown';
import type { DropdownProps } from './types';
import css from './react-dialog.module.css';
import { getArrowStyles, getDialogStyles } from './utils';

export const Dropdown: FC<DropdownProps> = ({
  children,
  targetLabel,
  isOpen = false,
  style = {},
  onClose = () => {},
  placement = 'bottom',
  arrowDimensions = {
    width: 10,
    height: 10,
  },
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const { openDialog, closeDialog, floatingStyles, middlewareData, open } =
    useDropdown({
      dialog: dialogRef.current,
      anchor: buttonRef.current,
      isOpen,
      floating: {
        middleware: [shift(), offset(), flip(), arrow({ element: arrowRef })],
        placement,
      },
    });
  function closeDropdown() {
    closeDialog();
    onClose?.();
  }
  return (
    <div className={`${open ? 'dropdown--open' : ''}`}>
      <button
        ref={buttonRef}
        tabIndex={0}
        data-testid="dropdown-trigger"
        onClick={openDialog}
      >
        {targetLabel}
      </button>
      <dialog
        className={`${css.dropdown}`}
        ref={dialogRef}
        style={{
          ...floatingStyles,
          ...getDialogStyles({ middlewareData, arrowDimensions }),
        }}
      >
        <svg
          ref={arrowRef}
          data-testid="dropdown-arrow"
          style={{
            ...getArrowStyles({ middlewareData }),
          }}
          width={arrowDimensions.width}
          height={arrowDimensions.height}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="50,15 90,85 10,85" />
        </svg>
        <div
          data-testid="dropdown-body"
          className={css['dropdown__body']}
          style={{
            ...style,
          }}
        >
          {children}
          <button
            tabIndex={0}
            data-testid="dropdown-close"
            onClick={closeDropdown}
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
};
