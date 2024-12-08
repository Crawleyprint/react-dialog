import { useCallback, useEffect, useLayoutEffect } from 'react';
import { useDialog } from './useDialog';
import { getFocusableElements } from '../utils';
import { useFloating, autoUpdate } from '@floating-ui/react-dom';
import type { IUseDropdown, IUseDropdownReturn } from '../types';

export function useDropdown({
  dialog,
  anchor,
  isOpen,
  floating,
}: IUseDropdown): IUseDropdownReturn {
  const { openDialog, closeDialog, open } = useDialog({
    dialog,
    isOpen,
    type: 'dropdown',
  });
  const { refs, floatingStyles, elements, update, middlewareData } =
    useFloating({
      ...floating,
    });

  useEffect(() => {
    refs.setReference(anchor);
    refs.setFloating(dialog);
  }, [dialog, anchor, refs]);
  useLayoutEffect(() => {
    if (!open) return;
    if (dialog) {
      /**
       * setTimeout call is required to ensure
       * that focus is properly set in Safari
       */
      setTimeout(() => {
        const focusableElements = getFocusableElements(dialog);
        (focusableElements?.[0] as HTMLElement)?.focus();
      }, 0);
    }
  }, [open, dialog]);

  useEffect(() => {
    if (open && elements.reference && elements.floating) {
      const cleanup = autoUpdate(elements.reference, elements.floating, update);
      return cleanup;
    }
  }, [open, elements, update]);

  const closeOnClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Element;
      if (open && !dialog?.contains(target) && target !== anchor) closeDialog();
    },
    [dialog, anchor, open, closeDialog]
  );

  useEffect(() => {
    if (open) {
      window.addEventListener('click', closeOnClickOutside);
    }
    return () => {
      window.removeEventListener('click', closeOnClickOutside);
    };
  }, [open, closeOnClickOutside]);

  return {
    openDialog,
    closeDialog,
    open,
    floatingStyles,
    middlewareData,
  };
}
