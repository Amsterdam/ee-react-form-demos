import { vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';

vi.mock('./hooks/useEntityFormValidation', () => ({
  default: () => ({
    validateForm: vi.fn(() => true),
    validateField: vi.fn(),
    clearAllErrors: vi.fn(),
    errors: {},
  }),
}));

import CreateEntity from './CreateEntity';

describe('CreateEntity', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    // Reset and restore the original mock before each test
    vi.resetAllMocks();
    vi.resetModules();

    // Re-establish the default mock
    vi.doMock('./hooks/useEntityFormValidation', () => ({
      default: () => ({
        validateForm: vi.fn(() => true),
        validateField: vi.fn(),
        clearAllErrors: vi.fn(),
        errors: {},
      }),
    }));
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.resetAllMocks();
    vi.resetModules();
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

  it('updates the submit button and shows submitting text after submit', async () => {
    render(<CreateEntity />);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(submitButton);

    // This waits for the button text to change
    expect(
      screen.getByRole('button', { name: /submitting/i })
    ).toBeInTheDocument();

    // Let the fake API call finish *inside* act
    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
    });
  });

  it('submits form and shows loader + success alert', async () => {
    render(<CreateEntity />);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    await act(() => fireEvent.click(submitButton));

    await act(() => {
      vi.runAllTimers();
    });

    await waitFor(() => {
      const successMessage = screen.queryByText(/the form has been sent/i);
      return expect(successMessage).toBeInTheDocument();
    });
  });

  it('does not submit form when validation fails', async () => {
    vi.resetModules();
    vi.doMock('./hooks/useEntityFormValidation', () => ({
      default: () => ({
        validateForm: vi.fn(() => false),
        validateField: vi.fn(),
        clearAllErrors: vi.fn(),
        errors: {},
      }),
    }));

    const { default: CreateEntity } = await import('./CreateEntity');
    render(<CreateEntity />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(screen.queryByText(/Submitting/i)).not.toBeInTheDocument();
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
