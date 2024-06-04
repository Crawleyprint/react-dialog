import { render } from '@testing-library/react';

import ReactDialog from './react-dialog';

describe('ReactDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactDialog />);
    expect(baseElement).toBeTruthy();
  });
});
