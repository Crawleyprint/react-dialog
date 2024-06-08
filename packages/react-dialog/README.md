# react-dialog

This library is, first and foremost, a collection of react hooks which aim to simplify
creation of your own dialogs.

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

Usage:

```
import { useRef } from 'react';
import { useDialog } from '@crawleyprint/react-dialog';

export function Dialog() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { openDialog, closeDialog } = useDialog();
    return <>
        <button onClick={openDialog}>
        <dialog>
            <p>Dialog contents</p>
            <button onClick={closeDialog}>Close</button>
        </dialog>
    </>
}
```
