import { useRef } from 'react';
import { useDropdown } from '@crawleyprint/react-dialog'; // Make sure the path is correct
import css from '../app.module.css';
import { autoPlacement } from '@floating-ui/react-dom';

const DropdownWithHooks = () => {
  const dialogRef = useRef(null);
  const anchorRef = useRef(null);

  const { open, openDialog, closeDialog, floatingStyles } = useDropdown({
    dialog: dialogRef.current,
    anchor: anchorRef.current,
    floating: { placement: 'bottom', middleware: [autoPlacement()] },
  });

  return (
    <div className={`${open ? ' dropdown--open' : ''}`}>
      <button tabIndex={0} ref={anchorRef} onClick={openDialog}>
        Show Dropdown
      </button>
      <dialog
        ref={dialogRef}
        className={`${css.dropdown}`}
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
        <button tabIndex={0} onClick={closeDialog}>
          Close dropdown
        </button>
      </dialog>
    </div>
  );
};

export default DropdownWithHooks;
