import { useDialog } from '@crawleyprint/react-dialog';
import { useRef } from 'react';
import css from '../app.module.css';

export default function StandaloneHooks() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const targetRef = useRef<HTMLButtonElement>(null);
  const { openDialog, closeDialog } = useDialog({
    dialog: dialogRef.current,
  });

  function show() {
    openDialog();
  }
  function hide() {
    closeDialog();
  }
  return (
    <div>
      <button className="btn" onClick={show} ref={targetRef}>
        Open with hook
      </button>
      <dialog ref={dialogRef} className={css.dialog}>
        <p>Dialog content</p>
        <button onClick={hide} className="btn">
          Close button implemented with hook
        </button>
      </dialog>
      <p>
        All other examples have been done using `Dialog` component from this
        repository. This one, however, is composed using regular HTML elements
        and hooks.
      </p>
    </div>
  );
}
