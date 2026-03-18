import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText('Verbeter de fouten voor u verder gaat')
      ).toBeInTheDocument();
    });
  });

  it('should show individual validation errors', async () => {
    render(<ContactForm />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText('Verbeter de fouten voor u verder gaat')
      ).toBeInTheDocument();
      expect(screen.getAllByText(/Enter your name/i).length).toBeGreaterThan(0);
      expect(
        screen.getAllByText(
          /Enter an email address in the correct format, like name@example.com/i
        ).length
      ).toBeGreaterThan(0);
      expect(screen.getAllByText(/Enter your message/i).length).toBeGreaterThan(
        0
      );
    });
  });

  it('should show a loader when form is being submitted', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), 'John');
    await user.type(
      screen.getByLabelText(/email address/i),
      'john@example.com'
    );
    await user.type(screen.getByLabelText(/message/i), 'Hello!');

    user.click(screen.getByRole('button', { name: /submit/i }));

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

    await waitFor(() => {
      expect(
        screen.getByText('Verbeter de fouten voor u verder gaat')
      ).toBeInTheDocument();
    });

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
    expect(
      screen.queryByText('Verbeter de fouten voor u verder gaat')
    ).not.toBeInTheDocument();
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

    await waitFor(() => {
      expect(
        screen.getByText('Verbeter de fouten voor u verder gaat')
      ).toBeInTheDocument();
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
});
