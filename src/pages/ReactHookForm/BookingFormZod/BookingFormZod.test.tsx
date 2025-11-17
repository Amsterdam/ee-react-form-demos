import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import BookingForm from './BookingFormZod';

describe('ReactHookForm / BookingForm', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders intro step and moves to personal details on click', async () => {
    render(<BookingForm />);

    // Intro step should be visible
    expect(
      screen.getByText(/Waar u dit formulier voor gebruikt/i)
    ).toBeInTheDocument();

    // Click start button
    await userEvent.click(
      screen.getByRole('link', { name: /Start het formulier/i })
    );

    // Personal details step should be visible
    expect(screen.getByLabelText(/voornaam/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
  });

  it('validates required fields and blocks next step', async () => {
    render(<BookingForm />);

    // Click start button
    await userEvent.click(
      screen.getByRole('link', { name: /Start het formulier/i })
    );

    // Click next without filling fields
    await userEvent.click(screen.getByRole('button', { name: /volgende/i }));

    // Should show validation errors
    expect(
      screen.getAllByText(/voornaam is verplicht/i).length
    ).toBeGreaterThan(0);
    expect(screen.getAllByText(/ongeldig e-mailadres/i).length).toBeGreaterThan(
      0
    );

    expect(screen.getByLabelText(/voornaam/i)).toBeInTheDocument();
  });

  it('completes all steps and shows success content', async () => {
    render(<BookingForm />);

    const user = userEvent.setup();

    // Click start button
    await userEvent.click(
      screen.getByRole('link', { name: /Start het formulier/i })
    );

    // Fill personal details
    await user.type(screen.getByLabelText(/voornaam/i), 'John Doe');
    await user.type(screen.getByLabelText(/e-mailadres/i), 'john@example.com');
    await user.click(screen.getByRole('button', { name: /volgende/i }));

    // Step 2 — Appointment
    const startDateInput = screen.getByLabelText(/startdatum/i);
    const startTimeInput = screen.getByLabelText(/starttijd/i);
    const endDateInput = screen.getByLabelText(/einddatum/i);
    const endTimeInput = screen.getByLabelText(/eindtijd/i);

    fireEvent.change(startDateInput, { target: { value: '2025-11-13' } });
    fireEvent.change(endDateInput, { target: { value: '2025-11-13' } });
    fireEvent.change(startTimeInput, { target: { value: '09:00' } });
    fireEvent.change(endTimeInput, { target: { value: '10:00' } });

    await user.click(screen.getByRole('button', { name: /volgende/i }));

    // Step 3 — Confirm
    await user.click(screen.getByRole('button', { name: /verzenden/i }));

    // Simulate setTimeout completion
    act(() => vi.advanceTimersByTime(1500));

    await waitFor(() => {
      expect(screen.getByText(/dank u voor uw inzending/i)).toBeInTheDocument();
    });
  });

  it('shows error when end time is before start time', async () => {
    render(<BookingForm />);
    const user = userEvent.setup();

    // Click start button
    await userEvent.click(
      screen.getByRole('link', { name: /Start het formulier/i })
    );

    // Fill personal details
    await user.type(screen.getByLabelText(/voornaam/i), 'John Doe');
    await user.type(screen.getByLabelText(/e-mailadres/i), 'john@example.com');
    await user.click(screen.getByRole('button', { name: /volgende/i }));

    // Step 2 — Appointment
    const startDateInput = screen.getByLabelText(/startdatum/i);
    const endDateInput = screen.getByLabelText(/einddatum/i);
    const startTimeInput = screen.getByLabelText(/starttijd/i);
    const endTimeInput = screen.getByLabelText(/eindtijd/i);

    fireEvent.change(startDateInput, { target: { value: '2025-11-13' } });
    fireEvent.change(endDateInput, { target: { value: '2025-11-13' } });
    fireEvent.change(startTimeInput, { target: { value: '10:00' } });
    fireEvent.change(endTimeInput, { target: { value: '09:00' } });

    await user.click(screen.getByRole('button', { name: /volgende/i }));

    expect(
      screen.getAllByText(
        'De einddatum en -tijd moeten later zijn dan de startdatum en -tijd'
      ).length
    ).toBeGreaterThan(0);
  });
});
