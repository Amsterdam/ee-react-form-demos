import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from './ContactForm';
import { act } from 'react';
import userEvent from '@testing-library/user-event';

describe('ContactForm', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    // vi.clearAllTimers();
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should render the contact form correctly', () => {
    render(<ContactForm />);
    expect(
      screen.getByRole('heading', { name: /contact form/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should update form data when user types', async () => {
    render(<ContactForm />);

    act(() => {
      fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: 'John' },
      });
      fireEvent.change(screen.getByLabelText(/email address/i), {
        target: { value: 'john@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/message/i), {
        target: { value: 'Hello!' },
      });
    });

    expect(screen.getByLabelText(/name/i)).toHaveValue('John');
    expect(screen.getByLabelText(/email address/i)).toHaveValue(
      'john@example.com'
    );
    expect(screen.getByLabelText(/message/i)).toHaveValue('Hello!');
  });

  it('should show validation errors when the form is submitted with invalid data', async () => {
    render(<ContactForm />);

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });

    await screen.findByText(/unsuccessful/i);
    expect(
      screen.getByText(/there was an error with the following fields:/i)
    ).toBeInTheDocument();
  });

  it('should show individual validation errors', async () => {
    render(<ContactForm />);

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });

    await screen.findByText(/unsuccessful/i);
    expect(
      screen.getByText(/first name: this field is required/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /email address: you have entered an invalid value for this field/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/message: this field is required/i)
    ).toBeInTheDocument();
  });

  it('should show a loader when form is being submitted', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await act(async () => {
      await user.type(screen.getByLabelText(/name/i), 'John');
      await user.type(
        screen.getByLabelText(/email address/i),
        'john@example.com'
      );
      await user.type(screen.getByLabelText(/message/i), 'Hello!');
    });

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });

  it('should show success message after successful submission', async () => {
    render(<ContactForm />);

    act(() => {
      fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: 'John' },
      });
      fireEvent.change(screen.getByLabelText(/email address/i), {
        target: { value: 'john@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/message/i), {
        target: { value: 'Hello!' },
      });

      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });

    // Capture first `setIsLoading(true)` render change
    await act(async () => {
      vi.runAllTimers();
    });

    // And now capture second `setIsLoading(true)` render change
    await act(async () => {
      vi.runAllTimers();
    });

    await screen.findByText(/the form has been sent/i);
    expect(screen.getByText(/success/i)).toBeInTheDocument();
  });

  it('should clear errors when form is resubmitted with valid data', async () => {
    render(<ContactForm />);

    // First submit with invalid data
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });

    await screen.findByText(/unsuccessful/i);
    expect(
      screen.getByText(/first name: This field is required/i)
    ).toBeInTheDocument();

    // Submit with valid data
    act(() => {
      fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: 'Jane' },
      });
      fireEvent.change(screen.getByLabelText(/email address/i), {
        target: { value: 'jane@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/message/i), {
        target: { value: 'Hi there' },
      });
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });

    await act(async () => {
      vi.runAllTimers();
    });
    await act(async () => {
      vi.runAllTimers();
    });

    await screen.findByText(/the form has been sent/i);
    expect(screen.queryByText(/unsuccessful/i)).not.toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(<ContactForm />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const messageInput = screen.getByLabelText(/message/i);

    expect(nameInput).toHaveAttribute('aria-describedby');
    expect(emailInput).toHaveAttribute('aria-describedby');
    expect(messageInput).toHaveAttribute('aria-describedby');
  });

  it('should have aria-invalid attributes when form is submitted with invalid data', async () => {
    render(<ContactForm />);

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });

    await screen.findByText(/unsuccessful/i);

    expect(screen.getByLabelText(/name/i)).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(screen.getByLabelText(/message/i)).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });
});
