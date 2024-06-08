import '@floating-ui/react-dom';
import { useDialog } from './useDialog';

export function useDropdown({
  dialog,
  isOpen,
}: Crawleyprint.IUseDropdown): Crawleyprint.IUseDropdownReturn {
  const { openDialog, closeDialog, open } = useDialog({ dialog, isOpen });
  return {
    openDialog,
    closeDialog,
    open,
  };
}
