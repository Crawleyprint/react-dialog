import { useEffect, useRef, useState } from 'react';

export function useDialog({
  dialog,
  isOpen = false,
}: Crawleyprint.IUseDialog): Crawleyprint.IUseDialogReturn {
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
      dialogRef.current?.showModal();
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
