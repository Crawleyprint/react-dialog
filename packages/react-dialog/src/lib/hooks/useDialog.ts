import { useFloating, flip, size, autoUpdate } from '@floating-ui/react-dom';
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';

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
  const { refs, floatingStyles } = useFloating({
    placement: 'bottom',
    middleware: [flip(), size()],
    whileElementsMounted: autoUpdate,
  });

  const [_, setStyles] = useState<CSSProperties>({});

  function updateReferences(
    argDialog: HTMLDialogElement,
    argTrigger: HTMLElement
  ) {
    refs.setFloating(argDialog);
    refs.setReference(argTrigger);
  }
  const openDialog = useCallback(() => {
    if (!dialog || !trigger) return;
    dialog.showModal();
    updateReferences(dialog, trigger);
  }, [dialog, trigger]);

  const closeDialog = useCallback(() => {
    if (!dialog) return;
    dialog.close();
  }, [dialog]);

  useEffect(() => {
    isOpen && openDialog();
    setStyles({}); // force rerendering, hack!
  }, [isOpen, openDialog]);

  return {
    openDialog,
    closeDialog,
    styles: flyout ? { ...style, ...floatingStyles } : style,
  };
}
