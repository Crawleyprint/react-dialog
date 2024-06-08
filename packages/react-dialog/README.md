# react-dialog

This library is, first and foremost, a collection of react hooks which aim to simplify
creation of your own dialogs.

## Installation

```
npm install @crawleyprint/react-dialog --save
```

## Running unit tests

Run `nx test react-dialog` to execute the unit tests via [Vitest](https://vitest.dev/).

## useDialog hook

Implements basic show and hide functionality of the dialog.

```
interface IUseDialog {
  dialog: HTMLDialogElement | null;
  style?: CSSProperties;
  isOpen?: boolean;
}
```

returns:

```
interface IUseDialogReturn {
  openDialog: () => void;
  closeDialog: () => void;
  open: boolean;
}
```

Example dialog component:

```
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

### Coming soon: Dropdown using hooks and better docs
