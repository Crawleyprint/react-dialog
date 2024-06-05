import { useDialog } from '@crawleyprint/react-dialog';
import { useRef } from 'react';
import css from '../app.module.css';

export default function StandaloneHooks() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const targetRef = useRef<HTMLButtonElement>(null);
  const { open, close, styles } = useDialog({
    dialog: dialogRef.current,
    trigger: targetRef.current,
  });

  function show() {
    open();
  }
  function hide() {
    close();
  }
  return (
    <div>
      <button className="btn" onClick={show} ref={targetRef}>
        Open with hook
      </button>
      <dialog ref={dialogRef} className={css.dialog} style={styles}>
        <p>Dialog content</p>
        <button onClick={hide} className="btn">
          Close with hook
        </button>
      </dialog>
    </div>
  );
}
