import { CSSProperties, useEffect, useRef, useState } from 'react';

type useDialogArgumentsType = {
  dialog: HTMLDialogElement | null;
  trigger: HTMLElement | null;
  style?: CSSProperties;
  isOpen?: boolean;
  flyout?: 'up' | 'down' | 'left' | 'right';
};

export function useDialog({
  dialog,
  trigger,
  style = {},
  flyout = undefined,
  isOpen = false,
}: useDialogArgumentsType) {
  const [openStatus, setOpenStatus] = useState<boolean>(isOpen);
  const dialogRef = useRef<HTMLDialogElement | null>(dialog);
  const triggerRef = useRef<HTMLElement | null>(trigger);
  const [styles, setStyles] = useState<Record<string, unknown>>({
    ...style,
  });

  function openDialog() {
    if (!dialogRef.current || !triggerRef.current) return;
    dialogRef.current.showModal();
    if (flyout) positionFlyout();
  }

  function closeDialog() {
    if (!dialogRef.current) return;
    dialogRef.current.close();
  }

  function positionFlyout() {
    if (!flyout) return;
    if (!triggerRef.current) return;
    if (!dialogRef.current) return;
    const {
      top,
      left,
      height,
      width: triggerWidth,
    } = triggerRef.current.getBoundingClientRect();
    const { width: dialogWidth } = dialogRef.current.getBoundingClientRect();
    const t = top + height + 10;
    let l = left + triggerWidth / 2 - dialogWidth / 2;
    if (l < 0) l = 0;
    const updatedStyles = {
      top: t,
      left: l,
      margin: 0,
    };
    setStyles((oldStyles) => ({ ...oldStyles, ...updatedStyles }));
  }
  useEffect(() => {
    triggerRef.current = trigger;
  }, [trigger]);

  useEffect(() => {
    dialogRef.current = dialog;
    isOpen && openDialog();
    isOpen && flyout && positionFlyout();
  }, [dialog, isOpen]);

  useEffect(() => {
    window.addEventListener('resize', positionFlyout);
    window.addEventListener('scroll', positionFlyout);

    setStyles((oldStyles) => ({ ...oldStyles, ...style }));
    openStatus && flyout && positionFlyout();
    return () => {
      window.removeEventListener('resize', positionFlyout);
      window.removeEventListener('scroll', positionFlyout);
    };
  }, [openStatus, flyout]);
  return {
    openDialog,
    closeDialog,
    styles,
  };
}
