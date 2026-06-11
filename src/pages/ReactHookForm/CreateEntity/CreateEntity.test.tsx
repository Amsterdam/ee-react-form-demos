import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import CreateEntity from './CreateEntity';

describe('CreateEntity', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    // Reset and restore the original mock before each test
    vi.resetAllMocks();
    vi.resetModules();
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

  it('should update form data when user types', async () => {
    render(<CreateEntity />);

    act(() => {
      fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: 'John' },
      });
      fireEvent.change(screen.getByLabelText(/description/i), {
        target: {
          value:
            'The name of the entity. This name is both meant for human eyes to recognize the entity and for machines and other components to reference the entity',
        },
      });
      fireEvent.change(screen.getByLabelText(/lifecycle/i), {
        target: { value: 'beta' },
      });
    });

    expect(screen.getByLabelText(/name/i)).toHaveValue('John');
    expect(screen.getByLabelText(/description/i)).toHaveValue(
      'The name of the entity. This name is both meant for human eyes to recognize the entity and for machines and other components to reference the entity'
    );
    expect(screen.getByLabelText(/lifecycle/i)).toHaveValue('beta');
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
    act(() => fireEvent.click(checkbox));
    await waitFor(async () =>
      expect(
        checkbox.parentElement?.parentElement?.nextElementSibling
          ?.querySelector('label')
          ?.textContent?.trim()
      ).toEqual('Tags')
    );
  });

  it('should show validation errors when the form is submitted with invalid data', async () => {
    window.HTMLElement.prototype.scrollIntoView = () => {};

    render(<CreateEntity />);

    act(() => {
      fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: '' },
      });
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });

    await screen.findAllByText(/Enter a name/i);
    expect(screen.getAllByText(/Enter a name/i).length).toBeGreaterThan(0);
  });

  it('should show individual validation errors', async () => {
    render(<CreateEntity />);

    act(() => fireEvent.click(screen.getByRole('button', { name: /Reset/i })));
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });

    await waitFor(() => {
      expect(screen.getAllByText(/Enter a name/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Select an owner/i).length).toBeGreaterThan(0);
    });
  });

  it('updates the submit button and shows submitting text after submit', async () => {
    render(<CreateEntity />);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    act(() => fireEvent.click(submitButton));

    // This waits for the button text to change
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /submitting/i }))
    );
  });

  it('submits form and shows loader + success alert', async () => {
    render(<CreateEntity />);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    await act(() => fireEvent.click(submitButton));

    expect(
      screen.getByRole('status', { name: /bezig met verzenden/i })
    ).toBeInTheDocument();

    await act(() => {
      vi.runAllTimers();
    });

    await waitFor(() => {
      const successMessage = screen.queryByText(/the form has been sent/i);
      return expect(successMessage).toBeInTheDocument();
    });
  });

  it('resets the form on clicking "Reset"', () => {
    render(<CreateEntity />);

    act(() => {
      fireEvent.change(screen.getByLabelText(/Name/i), {
        target: { value: 'something-else' },
      });
    });

    expect(screen.getByDisplayValue('something-else')).toBeInTheDocument();

    act(() => fireEvent.click(screen.getByRole('button', { name: /Reset/i })));

    expect(
      screen.queryByDisplayValue('something-else')
    ).not.toBeInTheDocument();
  });
});
