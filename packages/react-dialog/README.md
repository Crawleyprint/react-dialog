# react-dialog

This library is, first and foremost, a collection of react hooks which aim to simplify
creation of your own dialogs.

## Examples

[Live Demo](http://crawleyprint.github.io/react-dialog/)

## Installation

```bash
npm install @crawleyprint/react-dialog @floating-ui/react-dom --save
```

## useDialog hook

Implements basic show and hide functionality of the dialog.

```typescript
interface IUseDialog {
  dialog: HTMLDialogElement | null;
  style?: CSSProperties;
  isOpen?: boolean;
}
```

returns:

```typescript
interface IUseDialogReturn {
  openDialog: () => void;
  closeDialog: () => void;
  open: boolean;
}
```

Example dialog component:

```typescript
import { useRef } from 'react';
import { useDialog } from '@crawleyprint/react-dialog';

export function Dialog({buttonTitle, children}) {
    const dialogRef = useRef(null);
    const { openDialog, closeDialog } = useDialog({
      dialog: dialogRef.current,
      style,
      isOpen,
    });
    // implement your custom logic, maybe
    // wrap openDialog and closeDialog in your own functions
    // to add more functionality
    return <>
        <button onClick={openDialog}>{buttonTitle}</button>
        <dialog>
            <p>{children}</p>
            <button onClick={closeDialog}>Close</button>
        </dialog>
    </>
}
```

### Create Dropdown component using hooks

```typescript
import { useRef } from 'react';
import { useDropdown } from '@crawleyprint/react-dialog'; // Make sure the path is correct

const DropdownWithHooks = ({children, buttonTitle}) => {
  const dialogRef = useRef(null);
  const anchorRef = useRef(null);

  const { open, openDialog, closeDialog, floatingStyles } = useDropdown({
    dialog: dialogRef.current,
    anchor: anchorRef.current,
    floating: { placement: 'bottom', middleware: [] },
  });

  return (
    <div>
      <button tabIndex={0} ref={anchorRef} onClick={openDialog}>
        {buttonTitle}
      </button>
      <dialog
        ref={dialogRef}
        className="dropdown"
        style={{
          margin: 0,
          ...floatingStyles,
        }}
      >
        {children}
        <button tabIndex={0} onClick={closeDialog}>
          Close dropdown
        </button>
      </dialog>
    </div>
  );
};

export default DropdownWithHooks;
```

Additionally, bump the z-index up to your preference, so your dropdowns are visible over everything else in DOM.
You can do this by adding the following CSS to `.dropdown` (or whatever you want to name CSS class for the dropdown,
just make sure names are matching in JSX and CSS):

```css
.dropdown {
  z-index: 1000;
}
```

## Usage with React Server Components

If you're using RSC-first framework such as Next.js, you'll need to add `'use client';` to the parent component
of the component you're using `Dialog` or `Dropdown` in.

See full [Next.js example](../server-rendered-example/) for details.
