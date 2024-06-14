import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dropdown } from './Dropdown';

describe('Dropdown', () => {
  describe('Basic functionality', () => {
    it('should render base element, trigger and close button', () => {
      const { baseElement } = render(
        <Dropdown targetLabel="Dropdown" closeBtnLabel="Close" />
      );
      expect(baseElement).toBeInTheDocument();
      expect(screen.getByText('Dropdown')).toBeInTheDocument();
    });
    it('should render children elements correctly', () => {
      const { baseElement } = render(
        <Dropdown targetLabel="Dropdown" closeBtnLabel="Close">
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dropdown>
      );
      expect(baseElement).toBeInTheDocument();
      expect(baseElement.getElementsByTagName('p').length).toEqual(2);
    });
    it('should have the correct visibility for each of the elements', () => {
      const { baseElement } = render(
        <Dropdown targetLabel="Dropdown" closeBtnLabel="Close">
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dropdown>
      );
      expect(baseElement).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-trigger')).toBeVisible();
      expect(screen.getByTestId('dropdown-close')).not.toBeVisible();
      expect(screen.getByTestId('dropdown-body')).not.toBeVisible();
    });
    it('should be visible if "open" attribute was provided', () => {
      const { baseElement } = render(
        <Dropdown targetLabel="Dropdown" isOpen closeBtnLabel="Close">
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dropdown>
      );
      expect(baseElement).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-trigger')).toBeVisible();
      expect(screen.getByTestId('dropdown-close')).toBeVisible();
      expect(screen.getByTestId('dropdown-body')).toBeVisible();
    });
    it('should be able to close initially open dropdown', async () => {
      const user = userEvent.setup();
      const { baseElement } = render(
        <Dropdown targetLabel="Dropdown" isOpen closeBtnLabel="Close">
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dropdown>
      );
      expect(baseElement).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-close')).toBeVisible();
      await user.click(screen.getByTestId('dropdown-close'));
      expect(screen.getByTestId('dropdown-body')).not.toBeVisible();
    });
    it('should display dropdown on trigger click', async () => {
      const user = userEvent.setup();
      const { baseElement } = render(
        <Dropdown targetLabel="Dropdown" closeBtnLabel="Close">
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dropdown>
      );
      const trigger = screen.getByTestId('dropdown-trigger');
      await user.click(trigger);
      expect(baseElement.querySelector('dialog')).toBeVisible();
    });
    it('should close on Esc', async () => {
      const user = userEvent.setup();
      const { baseElement } = render(
        <Dropdown targetLabel="Dropdown" closeBtnLabel="Close">
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dropdown>
      );
      const trigger = screen.getByTestId('dropdown-trigger');
      await user.click(trigger);
      expect(baseElement.querySelector('dialog')).toBeVisible();
      await user.keyboard('[Escape]');
      expect(baseElement.querySelector('dialog')).not.toBeVisible();
    });
    it('should be able to open again after closing with Esc', async () => {
      const user = userEvent.setup();
      const { baseElement } = render(
        <Dropdown targetLabel="Dropdown" closeBtnLabel="Close">
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dropdown>
      );
      expect(baseElement.querySelector('dialog')).not.toBeVisible();
      const trigger = screen.getByTestId('dropdown-trigger');
      await user.click(trigger);
      expect(screen.getByTestId('dropdown-body')).toBeVisible();
      await user.keyboard('{Escape}');
      expect(baseElement.querySelector('dialog')).not.toBeVisible();
      await user.click(trigger);
      expect(baseElement.querySelector('dialog')).toBeVisible();
    });
    it('should close dropdown on close button click', async () => {
      const user = userEvent.setup();
      const { baseElement } = render(
        <Dropdown targetLabel="Dropdown" closeBtnLabel="Close">
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dropdown>
      );
      const trigger = screen.getByTestId('dropdown-trigger');
      const closeBtn = screen.getByTestId('dropdown-close');
      await user.click(trigger);
      expect(baseElement.querySelector('dialog')).toBeVisible();
      await user.click(closeBtn);
      expect(baseElement.querySelector('dialog')).not.toBeVisible();
    });
  });
  describe('Dropdown should accept css properties via style attribute', () => {
    it('should accept and respect width and height property', () => {
      render(
        <Dropdown
          targetLabel="Dropdown"
          closeBtnLabel="Close"
          style={{
            width: '300px',
            height: '100px',
          }}
        >
          <p>Child node 1</p>
          <p>Child node 2</p>
        </Dropdown>
      );
      const dropdown = screen.getByTestId('dropdown-body');
      expect(dropdown.style.width).toEqual('300px');
      expect(dropdown.style.height).toEqual('100px');
    });
  });
});

describe('Dropdown arrow', () => {
  it('should be present and visible when dropdown is open', async () => {
    render(<Dropdown targetLabel="Dropdown" isOpen closeBtnLabel="Close" />);
    const arrow = screen.getByTestId('dropdown-arrow');
    expect(arrow).toBeVisible();
  });
});

describe('Dropdown interaction', () => {
  it('should close one when opening another', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Dropdown targetLabel="Dropdown 1" isOpen closeBtnLabel="Close 1" />
        <Dropdown targetLabel="Dropdown 2" closeBtnLabel="Close 2" />
      </>
    );
    const closeBtn1 = screen.getByText('Close 1');
    const closeBtn2 = screen.getByText('Close 2');
    expect(closeBtn1).toBeVisible();
    expect(closeBtn2).not.toBeVisible();
    await user.click(screen.getByText('Dropdown 2'));
    expect(closeBtn2).toBeVisible();
    expect(closeBtn1).not.toBeVisible();
  });
  it('should focus the first focusable element', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Dropdown targetLabel="Dropdown 1" closeBtnLabel="Close 1">
          <input type="text" disabled />
          <select disabled>
            <option value=""></option>
          </select>
          <input type="text" tabIndex={-1} />
          <textarea name="" disabled></textarea>
          <input data-testid="focused" tabIndex={0} type="text" />
        </Dropdown>
        <Dropdown targetLabel="Dropdown 2" closeBtnLabel="Close 2">
          <a>Test</a>
          <a href="#test" data-testid="focused-anchor">
            Focused
          </a>
        </Dropdown>
      </>
    );

    const trigger1 = screen.getByText('Dropdown 1');
    const trigger2 = screen.getByText('Dropdown 2');
    await user.click(trigger1);
    expect(screen.getByTestId('focused')).toHaveFocus();
    await user.click(trigger2);
    expect(screen.getByTestId('focused-anchor')).toHaveFocus();
  });
});
