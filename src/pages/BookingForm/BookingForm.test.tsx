import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import BookingForm from './BookingForm';
import { act } from 'react';

// Mock fake loader delay
// vi.useFakeTimers();

describe('BookingForm', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders intro step and moves to personal details on click', () => {
    render(<BookingForm />);

    expect(
      screen.getByRole('heading', {
        name: /waar u dit formulier voor gebruikt/i,
      })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: /start het formulier/i }));

    expect(screen.getByText(/uw gegevens/i)).toBeInTheDocument();
  });

  it('validates required fields and blocks next step', async () => {
    render(<BookingForm />);

    fireEvent.click(screen.getByRole('link', { name: /start het formulier/i }));

    // Proceed to Step 1
    fireEvent.click(screen.getByRole('button', { name: /volgende vraag/i }));

    expect(screen.getAllByText(/naam is verplicht/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/ongeldig e-mailadres/i).length).toBeGreaterThan(
      0
    );
  });

  it('completes all steps and shows success content', async () => {
    render(<BookingForm />);

    // Step 0 → 1
    fireEvent.click(screen.getByRole('link', { name: /start het formulier/i }));

    // Complete Step 1
    fireEvent.change(screen.getByLabelText(/voornaam/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/e-mailadres/i), {
      target: { value: 'john@doe.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /volgende vraag/i }));

    // Complete Step 2
    const startDateInput = screen.getByLabelText(/startdatum/i);
    const endDateInput = screen.getByLabelText(/einddatum/i);
    const startTimeInput = screen.getByLabelText(/starttijd/i);
    const endTimeInput = screen.getByLabelText(/eindtijd/i);

    fireEvent.change(startDateInput, { target: { value: '2025-11-13' } });
    fireEvent.change(endDateInput, { target: { value: '2025-11-13' } });
    fireEvent.change(startTimeInput, { target: { value: '09:00' } });
    fireEvent.change(endTimeInput, { target: { value: '10:00' } });

    fireEvent.click(screen.getByRole('button', { name: /volgende vraag/i }));

    // Complete Step 3
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    // Fast-forward to skip the loader
    act(() => vi.advanceTimersByTime(1500));

    await waitFor(() =>
      expect(screen.getByText(/dank u voor uw inzending/i)).toBeInTheDocument()
    );
  });

  it('shows error when end time is before start time', async () => {
    render(<BookingForm />);

    // Step 0 → 1
    fireEvent.click(screen.getByRole('link', { name: /start het formulier/i }));

    // Complete Step 1
    fireEvent.change(screen.getByLabelText(/naam/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/e-mailadres/i), {
      target: { value: 'john@doe.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /volgende vraag/i }));

    // Complete Step 2 with invalid times
    const startDateInput = screen.getByLabelText(/startdatum/i);
    const endDateInput = screen.getByLabelText(/einddatum/i);
    const startTimeInput = screen.getByLabelText(/starttijd/i);
    const endTimeInput = screen.getByLabelText(/eindtijd/i);

    fireEvent.change(startDateInput, { target: { value: '2025-11-13' } });
    fireEvent.change(endDateInput, { target: { value: '2025-11-13' } });
    fireEvent.change(startTimeInput, { target: { value: '12:00' } });
    fireEvent.change(endTimeInput, { target: { value: '09:00' } });

    fireEvent.click(screen.getByRole('button', { name: /volgende vraag/i }));

    expect(
      screen.getAllByText(
        /de einddatum en -tijd moeten later zijn dan de startdatum en -tijd/i
      ).length
    ).toBeGreaterThan(0);
  });
});
