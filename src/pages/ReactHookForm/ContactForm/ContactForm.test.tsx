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
      screen.getByRole('heading', { name: /contactformulier/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/naam/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mailadres/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bericht/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /versturen/i })
    ).toBeInTheDocument();
  });

  it('should update form data when user types', async () => {
    render(<ContactForm />);

    act(() => {
      fireEvent.change(screen.getByLabelText(/naam/i), {
        target: { value: 'John' },
      });
      fireEvent.change(screen.getByLabelText(/e-mailadres/i), {
        target: { value: 'john@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/bericht/i), {
        target: { value: 'Hello!' },
      });
    });

    expect(screen.getByLabelText(/naam/i)).toHaveValue('John');
    expect(screen.getByLabelText(/e-mailadres/i)).toHaveValue(
      'john@example.com'
    );
    expect(screen.getByLabelText(/bericht/i)).toHaveValue('Hello!');
  });

  it('should show validation errors when the form is submitted with invalid data', async () => {
    render(<ContactForm />);

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /versturen/i }));
    });

    await screen.findByText(/niet gelukt/i);
    expect(screen.getByText(/er was een fout/i)).toBeInTheDocument();
  });

  it('should show individual validation errors', async () => {
    render(<ContactForm />);

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /versturen/i }));
    });

    await screen.findByText(/niet gelukt/i);
    expect(
      screen.getByText(/voornaam: dit veld is verplicht/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /e-mailadres: u hebt een ongeldige waarde ingevoerd voor dit veld/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/bericht: dit veld is verplicht/i)
    ).toBeInTheDocument();
  });

  it('should show a loader when form is being submitted', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/naam/i), 'John');
    await user.type(screen.getByLabelText(/e-mailadres/i), 'john@example.com');
    await user.type(screen.getByLabelText(/bericht/i), 'Hello!');
    await user.click(screen.getByRole('button', { name: /versturen/i }));

    await waitFor(() => {
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });

  it('should show success message after successful submission', async () => {
    render(<ContactForm />);

    act(() => {
      fireEvent.change(screen.getByLabelText(/naam/i), {
        target: { value: 'John' },
      });
      fireEvent.change(screen.getByLabelText(/e-mailadres/i), {
        target: { value: 'john@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/bericht/i), {
        target: { value: 'Hello!' },
      });

      fireEvent.click(screen.getByRole('button', { name: /versturen/i }));
    });

    // Capture first `setIsLoading(true)` render change
    await act(async () => {
      vi.runAllTimers();
    });

    // And now capture second `setIsLoading(true)` render change
    await act(async () => {
      vi.runAllTimers();
    });

    await screen.findByText(/het formulier is verzonden/i);
    expect(screen.getByText(/gelukt/i)).toBeInTheDocument();
  });

  it('should clear errors when form is resubmitted with valid data', async () => {
    render(<ContactForm />);

    // First submit with invalid data
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /versturen/i }));
    });

    await screen.findByText(/niet gelukt/i);
    expect(
      screen.getByText(/Voornaam: Dit veld is verplicht/i)
    ).toBeInTheDocument();

    // Submit with valid data
    act(() => {
      fireEvent.change(screen.getByLabelText(/naam/i), {
        target: { value: 'Jane' },
      });
      fireEvent.change(screen.getByLabelText(/e-mailadres/i), {
        target: { value: 'jane@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/bericht/i), {
        target: { value: 'Hi there' },
      });
      fireEvent.click(screen.getByRole('button', { name: /versturen/i }));
    });

    await act(async () => {
      vi.runAllTimers();
    });
    await act(async () => {
      vi.runAllTimers();
    });

    await screen.findByText(/het formulier is verzonden/i);
    expect(screen.queryByText(/niet gelukt/i)).not.toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(<ContactForm />);
    const nameInput = screen.getByLabelText(/naam/i);
    const emailInput = screen.getByLabelText(/e-mailadres/i);
    const messageInput = screen.getByLabelText(/bericht/i);

    expect(nameInput).toHaveAttribute('aria-describedby');
    expect(emailInput).toHaveAttribute('aria-describedby');
    expect(messageInput).toHaveAttribute('aria-describedby');
  });

  it('should have aria-invalid attributes when form is submitted with invalid data', async () => {
    render(<ContactForm />);

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /versturen/i }));
    });

    await screen.findByText(/niet gelukt/i);

    expect(screen.getByLabelText(/naam/i)).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(screen.getByLabelText(/e-mailadres/i)).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(screen.getByLabelText(/bericht/i)).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });
});
