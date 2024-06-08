import { CSSProperties, FC, useRef } from 'react';
import {
  shift,
  offset,
  flip,
  arrow,
  MiddlewareData,
} from '@floating-ui/react-dom';
import { useDropdown } from './hooks/useDropdown';
import css from './react-dialog.module.css';

function getArrowStyles(middlewareData: MiddlewareData): CSSProperties {
  const arrowPlacementProperty = {
    bottom: 'top',
    left: 'right',
    right: 'left',
    top: 'bottom',
  };
  const placement = middlewareData.offset?.placement || 'top';
  return {
    width: 10,
    height: 10,
    background: 'white',
    display: 'block',
    position: 'absolute',
    left: middlewareData.arrow?.x,
    top: middlewareData.arrow?.y,
  };
}

export const Dropdown: FC<Crawleyprint.DropdownProps> = ({
  children,
  targetLabel,
  isOpen = false,
  style = {},
  onClose = () => {},
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const { openDialog, closeDialog, floatingStyles, middlewareData, open } =
    useDropdown({
      dialog: dialogRef.current,
      anchor: buttonRef.current,
      isOpen,
      floating: {
        middleware: [shift(), offset(), flip(), arrow({ element: arrowRef })],
        placement: 'bottom',
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
        style={{ width: 80 }}
      >
        {targetLabel}
      </button>
      <dialog
        data-testid="dropdown-body"
        className={`${css.dropdown}`}
        ref={dialogRef}
        style={{
          paddingTop: 10,
          background: 'transparent',
          border: 0,
          margin: 0,
          ...style,
          ...floatingStyles,
        }}
      >
        <span
          ref={arrowRef}
          style={{ ...getArrowStyles(middlewareData) }}
        ></span>
        <div className="dropdown-content" style={{ background: 'white' }}>
          {children}
          <div>{JSON.stringify(middlewareData, null, 2)}</div>
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
