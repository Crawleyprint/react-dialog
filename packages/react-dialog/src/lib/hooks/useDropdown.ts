import { useEffect } from 'react';
import { useDialog } from './useDialog';
import { useFloating, autoUpdate } from '@floating-ui/react-dom';

export function useDropdown({
  dialog,
  anchor,
  isOpen,
  floating,
}: Crawleyprint.IUseDropdown): Crawleyprint.IUseDropdownReturn {
  const { openDialog, closeDialog, open } = useDialog({ dialog, isOpen });
  const { refs, floatingStyles, elements, update, middlewareData } =
    useFloating({
      ...floating,
    });

  useEffect(() => {
    refs.setReference(anchor);
    refs.setFloating(dialog);
  }, [dialog, anchor]);

  useEffect(() => {
    if (open && elements.reference && elements.floating) {
      const cleanup = autoUpdate(elements.reference, elements.floating, update);
      return cleanup;
    }
  }, [open, elements, update]);

  useEffect(() => {
    function closeOnClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      if (open && !target.closest(`.dropdown--open`)) closeDialog();
    }
    if (open) {
      window.addEventListener('click', closeOnClickOutside);
    }
    return () => {
      window.removeEventListener('click', closeOnClickOutside);
    };
  }, [open]);

  return {
    openDialog,
    closeDialog,
    open,
    floatingStyles,
    middlewareData,
  };
}
