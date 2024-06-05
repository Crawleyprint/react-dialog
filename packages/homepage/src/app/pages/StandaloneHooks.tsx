import { useDialog } from '@crawleyprint/react-dialog';
import { useRef } from 'react';
import css from '../app.module.css';

export default function StandaloneHooks() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { open, close } = useDialog();
  function show() {
    open(dialogRef.current);
  }
  function hide() {
    close(dialogRef.current);
  }
  return (
    <div>
      <button className="btn" onClick={show}>
        Open with hook
      </button>
      <dialog ref={dialogRef} className={css.dialog}>
        <p>Dialog content</p>
        <button onClick={hide} className="btn">
          Close with hook
        </button>
      </dialog>
    </div>
  );
}
