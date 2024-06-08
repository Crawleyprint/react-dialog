import { Middleware, MiddlewareData, Placement } from '@floating-ui/react-dom';

export interface IUseDialog {
  dialog: HTMLDialogElement | null;
  style?: CSSProperties;
  isOpen?: boolean;
}

export interface IUseDialogReturn {
  openDialog: () => void;
  closeDialog: () => void;
  open: boolean;
}

export interface DialogProps {
  targetLabel: string;
  closeBtnLabel?: string;
  children?: ReactNode;
  isOpen?: boolean;
  style?: CSSProperties;
  onClose?: () => void;
}

export interface IFloatingUI {
  middleware?: Middleware[];
  placement?: Placement;
}

export interface DropdownProps extends DialogProps {
  placement?: Placement;
}

export interface IUseDropdown extends IUseDialog {
  anchor: HTMLElement | null;
  floating?: IFloatingUI;
}
export interface IUseDropdownReturn extends IUseDialogReturn {
  floatingStyles: CSSProperties;
  middlewareData: MiddlewareData;
}
