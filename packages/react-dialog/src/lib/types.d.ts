import { Middleware, Placement } from '@floating-ui/react-dom';

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

  interface IFloatingUI {
    middleware?: Middleware[];
    placement?: Placement;
  }

  interface DropdownProps extends DialogProps {}

  interface IUseDropdown extends IUseDialog {
    anchor: HTMLElement | null;
    floating?: IFloatingUI;
  }
  interface IUseDropdownReturn extends IUseDialogReturn {
    floatingStyles: CSSProperties;
  }
}
