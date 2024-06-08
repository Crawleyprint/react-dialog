import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import {
  shift,
  offset,
  flip,
  arrow,
  MiddlewareData,
  Placement,
} from '@floating-ui/react-dom';
import { useDropdown } from './hooks/useDropdown';
import type { DropdownProps } from './types';
import css from './react-dialog.module.css';

const defaultStyles = {
  background: 'white',
  borderColor: 'black',
  offset: 10,
};

function getPlacementPrefix(placement: Placement) {
  if (!placement) return 'top';
  const offsetProperty: Record<string, string> = {
    bottom: 'top',
    left: 'right',
    right: 'left',
    top: 'bottom',
  };

  return offsetProperty[placement];
}

function getArrowStyles(middlewareData: MiddlewareData): CSSProperties {
  let arrowRotateAngles;
  switch (middlewareData.offset?.placement) {
    case 'top':
      arrowRotateAngles = 180;
      break;
    case 'right':
      arrowRotateAngles = -90;
      break;
    case 'left':
      arrowRotateAngles = 90;
      break;
    default:
      arrowRotateAngles = 0;
  }
  return {
    background: 'white',
    display: 'block',
    position: 'absolute',
    insetInlineStart: middlewareData.arrow?.x,
    insetBlockStart: middlewareData.arrow?.y,
    transform: `rotate(${arrowRotateAngles}deg)`,
  };
}

export const Dropdown: FC<DropdownProps> = ({
  children,
  targetLabel,
  isOpen = false,
  style = {},
  onClose = () => {},
  placement = 'bottom',
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const [paddingOffsetPrefix, setPaddingOffsetPrefix] =
    useState<string>('paddingTop');
  const [offsetPrefix, setOffsetPrefix] = useState('top');
  const { openDialog, closeDialog, floatingStyles, middlewareData, open } =
    useDropdown({
      dialog: dialogRef.current,
      anchor: buttonRef.current,
      isOpen,
      floating: {
        middleware: [shift(), offset(), flip(), arrow({ element: arrowRef })],
        placement,
      },
    });
  function closeDropdown() {
    closeDialog();
    onClose?.();
  }
  useEffect(() => {
    const prefix = getPlacementPrefix(
      middlewareData.offset?.placement || 'bottom'
    );
    setOffsetPrefix(prefix);
    setPaddingOffsetPrefix(
      `padding${prefix.charAt(0).toUpperCase() + prefix.slice(1)}`
    );
  }, [middlewareData.offset?.placement]);
  return (
    <div className={`${open ? 'dropdown--open' : ''}`}>
      <button
        ref={buttonRef}
        tabIndex={0}
        data-testid="dropdown-trigger"
        onClick={openDialog}
      >
        {targetLabel}
      </button>
      <dialog
        className={`${css.dropdown}`}
        ref={dialogRef}
        style={{
          background: 'transparent',
          border: 0,
          margin: 0,
          ...floatingStyles,
          [paddingOffsetPrefix]: defaultStyles.offset,
        }}
      >
        <svg
          ref={arrowRef}
          data-testid="dropdown-arrow"
          style={{
            ...getArrowStyles(middlewareData),
            [offsetPrefix]: 2,
            backgroundColor: 'transparent',
          }}
          width={defaultStyles.offset}
          height={defaultStyles.offset}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon fill={defaultStyles.background} points="50,15 90,85 10,85" />
        </svg>
        <div
          data-testid="dropdown-body"
          className={css['dropdown__body']}
          style={{
            ...style,
          }}
        >
          {children}
          <button
            tabIndex={0}
            data-testid="dropdown-close"
            onClick={closeDropdown}
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
};
