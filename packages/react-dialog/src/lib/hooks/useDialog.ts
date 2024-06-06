import {
  useFloating,
  flip,
  autoUpdate,
  shift,
  arrow,
  offset,
  size,
} from '@floating-ui/react-dom';
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

type useDialogArgumentsType = {
  dialog: HTMLDialogElement | null;
  trigger: HTMLElement | null;
  style?: CSSProperties;
  arrowEl?: HTMLElement | null;
  isOpen?: boolean;
  flyout?: 'up' | 'down' | 'left' | 'right';
};

export function useDialog({
  dialog,
  trigger,
  style = {},
  arrowEl = null,
  flyout = undefined,
  isOpen = false,
}: useDialogArgumentsType) {
  const [styles, setStyles] = useState<CSSProperties>({ ...style });
  const arrowRef = useRef<HTMLElement | null>(arrowEl);
  const dialogRef = useRef<HTMLDialogElement | null>(dialog);
  const triggerRef = useRef<HTMLElement | null>(trigger);
  const { refs, floatingStyles, middlewareData } = useFloating({
    placement: 'bottom',
    middleware: [
      shift({
        padding: 10,
      }),
      offset(10),
      flip(),
      arrow({
        element: arrowRef.current,
      }),
      size({
        padding: 10,
        apply({ availableHeight, availableWidth }) {
          flushSync(() =>
            setStyles((oldStyles) => ({
              ...oldStyles,
              maxHeight: availableHeight,
              maxWidth: availableWidth,
            }))
          );
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const updateReferences = useCallback(() => {
    refs.setFloating(dialogRef.current);
    refs.setReference(triggerRef.current);
  }, [dialog, trigger]);

  const openDialog = useCallback(() => {
    if (!dialogRef.current || !triggerRef.current) return;
    dialogRef.current.showModal();
    updateReferences();
  }, [dialog, trigger]);

  const closeDialog = useCallback(() => {
    if (!dialogRef.current) return;
    dialogRef.current.close();
  }, [dialog]);

  useEffect(() => {
    dialogRef.current = dialog;
    triggerRef.current = trigger;
    arrowRef.current = arrowEl;
    console.log(arrowEl);
  }, [dialog, trigger, arrowEl]);

  useEffect(() => {
    isOpen && openDialog();
    setStyles(style); // force rerendering, hack!
  }, [isOpen, openDialog, style]);

  return {
    openDialog,
    closeDialog,
    styles: flyout ? { ...styles, ...floatingStyles } : styles,
    arrowStyles: {
      left: middlewareData.arrow?.x,
    },
  };
}
