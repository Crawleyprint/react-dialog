import { renderHook } from '@testing-library/react';
import { useDialog } from './useDialog';
describe('useDialog() hook', () => {
  it('should return no styles if dialog and trigger are not provided', () => {
    const { result } = renderHook(useDialog, {
      initialProps: { dialog: null, trigger: null },
    });
    expect(result.current.styles).toEqual({});
  });
  it('should return css style when in flyout mode', () => {
    const trigger = document.createElement('button');
    const dialog = document.createElement('dialog');
    const { result } = renderHook(useDialog, {
      initialProps: { dialog, trigger, flyout: 'down', isOpen: true },
    });
    expect(result.current.styles).toEqual({ left: 0, margin: 0, top: 10 });
  });
});
