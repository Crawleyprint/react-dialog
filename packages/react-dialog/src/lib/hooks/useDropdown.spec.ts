import { renderHook, act } from '@testing-library/react';
import { useDropdown } from './useDropdown';
import userEvent from '@testing-library/user-event';

describe('useDropdown()', () => {
  it('should switch to being closed when clicked outside of the container', async () => {
    const user = userEvent.setup();
    const dialog = document.createElement('dialog');
    const anchor = document.createElement('span');
    const { result } = renderHook(useDropdown, {
      initialProps: { dialog, anchor },
    });
    act(() => {
      result.current.openDialog();
    });
    expect(result.current.open).toEqual(true);
    await user.click(document.body);
    expect(result.current.open).toEqual(false);
  });
});
