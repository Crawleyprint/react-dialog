import { renderHook, act } from '@testing-library/react';
import { useDialog } from './useDialog';
describe('useDialog() hook', () => {
  it('should return no styles if dialog and trigger are not provided', () => {
    const { result } = renderHook(useDialog, {
      initialProps: { dialog: null },
    });
    expect(result.current.openDialog).toBeTypeOf('function');
    expect(result.current.closeDialog).toBeTypeOf('function');
    expect(result.current.open).toEqual(false);
  });
  it('should update its open status', () => {
    const { result } = renderHook(useDialog, {
      initialProps: { dialog: null, isOpen: false },
    });
    act(() => {
      result.current.openDialog();
    });
    expect(result.current.open).toEqual(true);
  });
});
