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

interface DialogProps {
  targetLabel: string;
  closeBtnLabel?: string;
  placement?: 'up' | 'down' | 'left' | 'right';
  onClose?: () => void;
  children?: ReactNode;
  isOpen?: boolean;
  style?: CSSProperties;
}
