import {
  CSSProperties,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from 'react';

type useDialogArgumentsType = {
  style?: CSSProperties;
  closeFn?: () => void;
  flyout?: 'up' | 'down' | 'left' | 'right';
};

export function useDialog({
  style = {},
  flyout = undefined,
  closeFn = () => {},
}: useDialogArgumentsType) {
  const [openStatus, setOpenStatus] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [styles, setStyles] = useState<Record<string, unknown>>({
    top: 0,
    left: 0,
    ...style,
  });
  function close() {
    if (!dialogRef.current) return;
    closeFn();
    dialogRef.current.close();
  }
  function open(dialog: HTMLDialogElement | null, trigger: HTMLElement | null) {
    if (!dialog || !trigger) return;
    dialogRef.current = dialog;
    triggerRef.current = trigger;
    if (flyout) positionFlyout();
    dialogRef.current.showModal();
  }
  function positionFlyout() {
    if (!flyout) return;
    if (!triggerRef.current) return;
    if (!dialogRef.current) return;
    const { top, left, height } = triggerRef.current.getBoundingClientRect();
    const { width: dialogWidth } = dialogRef.current.getBoundingClientRect();
    const t = top + height + 10;
    let l = left - dialogWidth / 2;
    if (l < 0) l = 0;
    setStyles((oldStyles) => ({ ...oldStyles, top: t, left: l, margin: 0 }));
  }
  useEffect(() => {
    window.addEventListener('resize', positionFlyout);
    window.addEventListener('scroll', positionFlyout);

    setStyles((oldStyles) => ({ ...oldStyles, style }));

    return () => {
      window.removeEventListener('resize', positionFlyout);
      window.removeEventListener('scroll', positionFlyout);
    };
  }, []);
  return {
    open,
    close,
    styles,
    openStatus,
    setOpenStatus,
  };
}
