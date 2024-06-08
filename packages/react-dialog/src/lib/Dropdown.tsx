import { FC, useEffect, useRef } from 'react';
import { shift } from '@floating-ui/react-dom';
import { useDropdown } from './hooks/useDropdown';

export const Dropdown: FC<Crawleyprint.DropdownProps> = ({
  children,
  targetLabel,
  isOpen = false,
  style = {},
  onClose = () => {},
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { openDialog, closeDialog, floatingStyles } = useDropdown({
    dialog: dialogRef.current,
    anchor: buttonRef.current,
    isOpen,
    floating: {
      middleware: [shift()],
      placement: 'right',
    },
  });
  function closeDropdown() {
    closeDialog();
    onClose?.();
  }

  return (
    <>
      <button
        ref={buttonRef}
        data-testid="dropdown-trigger"
        onClick={openDialog}
      >
        {targetLabel}
      </button>
      <dialog
        data-testid="dropdown-body"
        ref={dialogRef}
        style={{ margin: 0, ...style, ...floatingStyles }}
      >
        <div className="dropdown-content">
          {children}
          <button data-testid="dropdown-close" onClick={closeDropdown}>
            Close
          </button>
        </div>
      </dialog>
    </>
  );
};
