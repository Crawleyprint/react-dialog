import { useEffect, useRef, useState } from 'react';
import type { IUseDialog, IUseDialogReturn } from '../types';

export function useDialog({
  dialog,
  isOpen = false,
  type = 'dialog',
}: IUseDialog): IUseDialogReturn {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [open, setOpen] = useState<boolean | null>(null);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    dialogRef.current = dialog;
    if (open) {
      if (type === 'dropdown') {
        dialogRef.current?.show();
      } else {
        dialogRef.current?.showModal();
      }
    } else {
      dialogRef.current?.close();
    }
  }, [dialog, open]);

  useEffect(() => {
    const handleCloseDialogOnEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDialog();
    };
    window.addEventListener('keydown', handleCloseDialogOnEsc);

    return () => {
      window.removeEventListener('keydown', handleCloseDialogOnEsc);
    };
  });

  return {
    openDialog,
    closeDialog,
    open: Boolean(open),
  };
}
