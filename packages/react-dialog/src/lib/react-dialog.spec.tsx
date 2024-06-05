import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dialog } from './Dialog';

describe('Dialog', () => {
  it('should render base element, trigger and close button', () => {
    const { baseElement } = render(
      <Dialog targetLabel="Dropdown" closeBtnLabel="Close" />
    );
    expect(baseElement).toBeInTheDocument();
    expect(screen.getByText('Dropdown')).toBeInTheDocument();
  });
  it('should render children elements correctly', () => {
    const { baseElement } = render(
      <Dialog targetLabel="Dropdown" closeBtnLabel="Close">
        <p>Child node 1</p>
        <p>Child node 2</p>
      </Dialog>
    );
    expect(baseElement).toBeInTheDocument();
    expect(baseElement.getElementsByTagName('p').length).toEqual(2);
  });
  it('should not have the correct visibility for each of the elements', () => {
    const { baseElement } = render(
      <Dialog targetLabel="Dropdown" closeBtnLabel="Close">
        <p>Child node 1</p>
        <p>Child node 2</p>
      </Dialog>
    );
    expect(baseElement).toBeInTheDocument();
    expect(screen.getByTestId('dialog-trigger')).toBeVisible();
    expect(screen.getByTestId('dialog-close')).not.toBeVisible();
    expect(screen.getByTestId('dialog-body')).not.toBeVisible();
  });
  it('should display dialog on trigger click', async () => {
    const user = userEvent.setup();
    const { baseElement } = render(
      <Dialog targetLabel="Dropdown" closeBtnLabel="Close">
        <p>Child node 1</p>
        <p>Child node 2</p>
      </Dialog>
    );
    const trigger = screen.getByTestId('dialog-trigger');
    await user.click(trigger);
    expect(baseElement.querySelector('dialog')).toBeVisible();
  });
});
