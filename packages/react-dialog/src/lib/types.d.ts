import type {
  Middleware,
  MiddlewareData,
  Placement,
} from '@floating-ui/react-dom';
import type { CSSProperties } from 'react';

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

interface ArrowDimensions {
  width: CSSProperties['width'];
  height: CSSProperties['height'];
}

export interface DropdownProps extends DialogProps {
  placement?: Placement;
  arrowDimensions?: ArrowDimensions;
}

export interface IUseDropdown extends IUseDialog {
  anchor: HTMLElement | null;
  floating?: IFloatingUI;
}
export interface IUseDropdownReturn extends IUseDialogReturn {
  floatingStyles: CSSProperties;
  middlewareData: MiddlewareData;
}

export interface IGetStyles {
  middlewareData: MiddlewareData;
  arrowDimensions: ArrowDimensions;
}
