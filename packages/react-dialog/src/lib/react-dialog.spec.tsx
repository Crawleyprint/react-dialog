import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dialog } from './Dialog';

describe('Dialog', () => {
  describe('Basic functionality', () => {
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
    it('should have the correct visibility for each of the elements', () => {
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
    it('should be visible if "open" attribute was provided', () => {
      const { baseElement } = render(
        <Dialog targetLabel="Dropdown" isOpen closeBtnLabel="Close">
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dialog>
      );
      expect(baseElement).toBeInTheDocument();
      expect(screen.getByTestId('dialog-trigger')).toBeVisible();
      expect(screen.getByTestId('dialog-close')).toBeVisible();
      expect(screen.getByTestId('dialog-body')).toBeVisible();
    });
    it('should be able to close initially open dialog', async () => {
      const user = userEvent.setup();
      const { baseElement } = render(
        <Dialog targetLabel="Dropdown" isOpen closeBtnLabel="Close">
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dialog>
      );
      expect(baseElement).toBeInTheDocument();
      expect(screen.getByTestId('dialog-close')).toBeVisible();
      await user.click(screen.getByTestId('dialog-close'));
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
    it('should close on Esc', async () => {
      const user = userEvent.setup();
      const { baseElement } = render(
        <Dialog targetLabel="Dropdown" closeBtnLabel="Close">
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dialog>
      );
      const trigger = screen.getByTestId('dialog-trigger');
      await user.keyboard('Escape');
      expect(baseElement.querySelector('dialog')).not.toBeVisible();
    });
    it('should close dialog on close button click', async () => {
      const user = userEvent.setup();
      const { baseElement } = render(
        <Dialog targetLabel="Dropdown" closeBtnLabel="Close">
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dialog>
      );
      const trigger = screen.getByTestId('dialog-trigger');
      const closeBtn = screen.getByTestId('dialog-close');
      await user.click(trigger);
      expect(baseElement.querySelector('dialog')).toBeVisible();
      await user.click(closeBtn);
      expect(baseElement.querySelector('dialog')).not.toBeVisible();
    });
  });
  describe('Dialog should accept css properties via style attribute', () => {
    it('should accept and respect width and height property', () => {
      render(
        <Dialog
          targetLabel="Dropdown"
          closeBtnLabel="Close"
          style={{
            width: '300px',
            height: '100px',
          }}
        >
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dialog>
      );
      const dialog = screen.getByTestId('dialog-body');
      expect(dialog.style.width).toEqual('300px');
      expect(dialog.style.height).toEqual('100px');
    });
  });
});
