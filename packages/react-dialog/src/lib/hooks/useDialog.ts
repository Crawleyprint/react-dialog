import type { MouseEvent } from 'react';

export function useDialog() {
  function open(dialog: HTMLDialogElement | null) {
    if (!dialog) return;
    dialog.showModal();
  }

  function close(dialog: HTMLDialogElement | null) {
    if (!dialog) return;
    dialog.close();
  }
  return {
    open,
    close,
  };
}
