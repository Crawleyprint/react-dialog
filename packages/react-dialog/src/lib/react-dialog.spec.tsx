import { render, screen } from '@testing-library/react';

import { Dialog } from './Dialog';

describe('ReactDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Dialog targetLabel="Dropdown" closeBtnLabel="Close" />
    );
    expect(baseElement).toBeInTheDocument();
    expect(screen.getByText('Dropdown')).toBeInTheDocument();
  });
});
