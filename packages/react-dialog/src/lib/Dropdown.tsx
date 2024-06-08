import { FC, useRef } from 'react';
import { useDropdown } from './hooks/useDropdown';

export const Dropdown: FC<Crawleyprint.DropdownProps> = ({
  children,
  targetLabel,
  isOpen = false,
  style = {},
  onClose = () => {},
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { openDialog, closeDialog } = useDropdown({
    dialog: dialogRef.current,
    isOpen,
  });
  function closeDropdown() {
    closeDialog();
    onClose?.();
  }
  return (
    <>
      <button data-testid="dropdown-trigger" onClick={openDialog}>
        {targetLabel}
      </button>
      <dialog data-testid="dropdown-body" ref={dialogRef} style={{ ...style }}>
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
