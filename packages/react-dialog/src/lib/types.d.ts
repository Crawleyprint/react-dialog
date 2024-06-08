interface IUseDialog {
  dialog: HTMLDialogElement | null;
  style?: CSSProperties;
  isOpen?: boolean;
}

interface IUseDialogReturn {
  openDialog: () => void;
  closeDialog: () => void;
  open: boolean;
}
