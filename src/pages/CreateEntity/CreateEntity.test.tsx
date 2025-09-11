import { vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import CreateEntity from './CreateEntity';

describe('CreateEntity', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders the component', () => {
    const { container } = render(<CreateEntity />);
    expect(container.firstChild).toBeDefined();
  });

  it('renders all main form fields', () => {
    render(<CreateEntity />);

    expect(screen.getByLabelText(/Kind/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Type/i)[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/Lifecycle/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Owner/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tags/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  it('renders system field when "hasSystem" checkbox is checked', async () => {
    render(<CreateEntity />);

    const checkbox = screen.getByLabelText(/entity belongs to a system/i);

    expect(
      checkbox.parentElement?.parentElement?.nextElementSibling
        ?.querySelector('label')
        ?.textContent?.trim()
    ).toEqual('System');

    // Uncheck the checkbox
    fireEvent.click(checkbox);
    await waitFor(async () =>
      expect(
        checkbox.parentElement?.parentElement?.nextElementSibling
          ?.querySelector('label')
          ?.textContent?.trim()
      ).toEqual('Tags')
    );
  });

  it('submits form and shows loader + success alert', async () => {
    render(<CreateEntity />);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    act(() => fireEvent.click(submitButton));

    act(() => {
      vi.runAllTimers();
    });

    await waitFor(() => {
      const successMessage = screen.queryByText(/the form has been sent/i);
      return expect(successMessage).toBeInTheDocument();
    });
  });

  it('resets the form on clicking "Reset"', () => {
    render(<CreateEntity />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'something-else' },
    });

    expect(screen.getByDisplayValue('something-else')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Reset/i }));

    expect(
      screen.queryByDisplayValue('something-else')
    ).not.toBeInTheDocument();
  });
});
