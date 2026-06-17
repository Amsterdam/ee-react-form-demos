import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ContactForm from './ContactForm';
import { act } from 'react';

describe('Examples / ContactForm', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
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
    expect(screen.getByLabelText(/opmerkingen/i)).toBeInTheDocument();
    expect(screen.getByText(/geslacht/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/man/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/vrouw/i)).toBeInTheDocument();

    expect(screen.getByText(/interesses/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nieuwsbrieven/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /verzenden/i })
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
      fireEvent.change(screen.getByLabelText(/opmerkingen/i), {
        target: { value: 'Hello!' },
      });
    });

    expect(screen.getByLabelText(/naam/i)).toHaveValue('John');
    expect(screen.getByLabelText(/e-mailadres/i)).toHaveValue(
      'john@example.com'
    );
    expect(screen.getByLabelText(/opmerkingen/i)).toHaveValue('Hello!');
  });

  it('should show validation errors when the form is submitted with invalid data', async () => {
    render(<ContactForm />);

    fireEvent.click(screen.getByRole('button', { name: /verzenden/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/verbeter de fouten voor u verder gaat/i)
      ).toBeInTheDocument();
    });
  });

  it('should show individual validation errors', async () => {
    render(<ContactForm />);

    fireEvent.click(screen.getByRole('button', { name: /verzenden/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/vul uw naam in/i).length).toBeGreaterThan(0);
      expect(
        screen.getAllByText(/vul uw e-mailadres in/i).length
      ).toBeGreaterThan(0);
      expect(screen.getAllByText(/vul uw bericht in/i).length).toBeGreaterThan(
        0
      );
      expect(screen.getAllByText(/vul uw geslacht in/i).length).toBeGreaterThan(
        0
      );
      expect(
        screen.getAllByText(/selecteer minimaal één interesse/i).length
      ).toBeGreaterThan(0);
    });
  });

  it('should show a loader when form is being submitted', async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/naam/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/e-mailadres/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/opmerkingen/i), {
      target: { value: 'Hello!' },
    });
    fireEvent.click(screen.getByLabelText(/man/i));
    fireEvent.click(screen.getByLabelText(/nieuwsbrieven/i));
    fireEvent.click(screen.getByRole('button', { name: /verzenden/i }));

    expect(
      screen.getByRole('status', { name: /bezig met verzenden/i })
    ).toBeInTheDocument();

    // Let the fake API call finish *inside* act
    await act(async () => {
      await vi.runOnlyPendingTimersAsync();
    });
  });

  it('should show success message after successful submission', async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/naam/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/e-mailadres/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/opmerkingen/i), {
      target: { value: 'Hello!' },
    });
    fireEvent.click(screen.getByLabelText(/man/i));
    fireEvent.click(screen.getByLabelText(/nieuwsbrieven/i));

    fireEvent.click(screen.getByRole('button', { name: /verzenden/i }));

    // Capture first `setIsLoading(true)` render change
    await act(async () => {
      vi.runAllTimers();
    });

    // And now capture second `setIsLoading(true)` render change
    await act(async () => {
      vi.runAllTimers();
    });

    await screen.findByText(/het formulier is verzonden/i);
    expect(screen.getByText(/succes/i)).toBeInTheDocument();
  });

  it('should clear errors when form is resubmitted with valid data', async () => {
    render(<ContactForm />);

    fireEvent.click(screen.getByRole('button', { name: /verzenden/i }));

    await waitFor(() => {
      screen.getByText(/verbeter de fouten voor u verder gaat/i);
      expect(screen.getAllByText(/vul uw naam in/i).length).toBeGreaterThan(0);
    });

    // Submit with valid data
    act(() => {
      fireEvent.change(screen.getByLabelText(/naam/i), {
        target: { value: 'Jane' },
      });
      fireEvent.change(screen.getByLabelText(/e-mailadres/i), {
        target: { value: 'jane@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/opmerkingen/i), {
        target: { value: 'Hi there' },
      });
      fireEvent.click(screen.getByLabelText(/man/i));
      fireEvent.click(screen.getByLabelText(/nieuwsbrieven/i));
      fireEvent.click(screen.getByRole('button', { name: /verzenden/i }));
    });

    await act(async () => {
      vi.runAllTimers();
    });
    await act(async () => {
      vi.runAllTimers();
    });

    await screen.findByText(/het formulier is verzonden/i);
    expect(
      screen.queryByText(/verbeter de fouten voor u verder gaat/i)
    ).not.toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(<ContactForm />);
    const nameInput = screen.getByLabelText(/naam/i);
    const emailInput = screen.getByLabelText(/e-mailadres/i);
    const messageInput = screen.getByLabelText(/opmerkingen/i);
    const genderLegend = screen.getByText(/geslacht/i);
    const interestsLegend = screen.getByText(/interesses/i);

    expect(nameInput).toHaveAttribute('aria-describedby');
    expect(emailInput).toHaveAttribute('aria-describedby');
    expect(messageInput).toHaveAttribute('aria-describedby');
    expect(genderLegend.parentElement).toHaveAttribute('aria-describedby');
    expect(interestsLegend.parentElement).toHaveAttribute('aria-describedby');
  });

  it('should have aria-invalid attributes when form is submitted with invalid data', async () => {
    render(<ContactForm />);
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /verzenden/i }));
    });

    await screen.findByText(/verbeter de fouten voor u verder gaat/i);

    expect(screen.getByLabelText(/naam/i)).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(screen.getByLabelText(/e-mailadres/i)).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(screen.getByLabelText(/opmerkingen/i)).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(screen.getByLabelText(/man/i)).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(screen.getByLabelText(/nieuwsbrieven/i)).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });
});
