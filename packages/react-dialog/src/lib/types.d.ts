namespace Crawleyprint {
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
    children?: ReactNode;
    isOpen?: boolean;
    style?: CSSProperties;
    onClose?: () => void;
  }

  interface DropdownProps extends DialogProps {}

  interface IUseDropdown extends IUseDialog {}
  interface IUseDropdownReturn extends IUseDialogReturn {}
}
