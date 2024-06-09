import { useRef, useState, useEffect } from 'react';
import { useDropdown } from '@crawleyprint/react-dialog'; // Make sure the path is correct
import css from '../app.module.css';

const DropdownWithHooks = () => {
  const dialogRef = useRef(null);
  const anchorRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const { openDialog, closeDialog, open, floatingStyles } = useDropdown({
    dialog: dialogRef.current,
    anchor: anchorRef.current,
    isOpen,
    floating: { placement: 'bottom' },
  });

  useEffect(() => {
    if (isOpen) {
      openDialog();
    }
  }, [isOpen, openDialog]);

  const showDialog = () => {
    setIsOpen(true);
  };

  const closeDropdown = () => {
    closeDialog();
    setIsOpen(false);
  };

  return (
    <div>
      <button ref={anchorRef} onClick={showDialog}>
        Show Dropdown
      </button>
      <dialog
        ref={dialogRef}
        className={`${css.dropdown}${open ? ' dropdown--open' : ''}`}
        style={{
          margin: 0,
          ...floatingStyles,
        }}
      >
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        <button onClick={closeDropdown}>Close dropdown</button>
      </dialog>
    </div>
  );
};

export default DropdownWithHooks;
