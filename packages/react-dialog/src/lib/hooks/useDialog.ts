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
  placement?: 'up' | 'down' | 'left' | 'right';
};

export function useDialog({
  dialog,
  trigger,
  style = {},
  arrowEl = null,
  placement = undefined,
  isOpen = false,
}: useDialogArgumentsType) {
  const [styles, setStyles] = useState<CSSProperties>({ ...style });
  const arrowRef = useRef<HTMLElement | null>(arrowEl);
  const dialogRef = useRef<HTMLDialogElement | null>(dialog);
  const triggerRef = useRef<HTMLElement | null>(trigger);
  const { refs, floatingStyles, middlewareData } = useFloating({
    placement: 'bottom',
    middleware: [
      arrow({
        element: arrowRef.current,
      }),
      shift({
        padding: 10,
      }),
      offset(10),
      flip(),
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

  useEffect(() => {
    console.log('middleware data changed', middlewareData);
  }, [middlewareData]);

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
  }, [dialog, trigger, arrowEl]);

  useEffect(() => {
    isOpen && openDialog();
    setStyles(style); // force rerendering, hack!
  }, [isOpen, openDialog, style]);

  return {
    openDialog,
    closeDialog,
    styles: placement ? { ...styles, ...floatingStyles } : styles,
    arrowStyles: {
      left: middlewareData.arrow?.x,
    },
  };
}
