import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { act } from 'react';
import BookingForm from './BookingForm';

describe('BookingForm', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders all required inputs and buttons', () => {
    render(<BookingForm />);
    expect(screen.getByLabelText(/Naam/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mailadres/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/End date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/End time/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset/i })).toBeInTheDocument();
  });

  it('validates required fields on submit and shows error messages', async () => {
    render(<BookingForm />);
    const submitBtn = screen.getByRole('button', { name: /Submit/i });
    await userEvent.click(submitBtn);

    expect(screen.getByTestId('error-alert')).toBeInTheDocument();
    // expect(screen.getAllByTestId('error-message').length).toBeGreaterThan(5);
    await waitFor(() => {
      // name, email, 4 sets of datatime fields
      expect(screen.getAllByText(/Invoerfout/i)).toHaveLength(5);
    });
  });

  it('submits valid data and shows success alert after loading', async () => {
    render(<BookingForm />);
    await act(async () => {
      await userEvent.type(screen.getByLabelText(/Naam/i), 'John Doe');
      await userEvent.type(
        screen.getByLabelText(/E-mailadres/i),
        'john@example.com'
      );

      await userEvent.type(screen.getByLabelText(/Start time/i), '09:00');
      await userEvent.type(screen.getByLabelText(/End date/i), '2099-12-31'); // valid future date
      await userEvent.type(screen.getByLabelText(/End time/i), '10:00');

      await userEvent.click(screen.getByRole('button', { name: /Submit/i }));
    });

    // Loader should show immediately
    await waitFor(() => {
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    // Advance timers to resolve setTimeout
    act(() => vi.advanceTimersByTime(1500));

    await waitFor(() =>
      expect(screen.getByTestId('success-alert')).toBeInTheDocument()
    );
  });

  it('resets all fields when reset button is clicked', async () => {
    render(<BookingForm />);
    const nameInput = screen.getByLabelText(/Naam/i);
    await userEvent.type(nameInput, 'Jane Doe');
    expect(nameInput).toHaveValue('Jane Doe');

    await userEvent.click(screen.getByRole('button', { name: /Reset/i }));

    await waitFor(() => {
      expect(nameInput).toHaveValue('');
    });
  });

  it('shows error when end time is before start time', async () => {
    render(<BookingForm />);
    await userEvent.type(screen.getByLabelText(/Naam/i), 'John Doe');
    await userEvent.type(
      screen.getByLabelText(/E-mailadres/i),
      'john@example.com'
    );

    // `userEvent.type` and DateInputs don't seem to get along
    fireEvent.change(screen.getByLabelText('Start date'), {
      target: {
        value: new Date(Date.now() + 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
      },
    });
    fireEvent.change(screen.getByLabelText('Start time'), {
      target: { value: '10:00' },
    });
    fireEvent.change(screen.getByLabelText('End date'), {
      target: {
        value: new Date(Date.now() + 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
      },
    });
    fireEvent.change(screen.getByLabelText('End time'), {
      target: { value: '09:00' },
    });

    await userEvent.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(
        screen.getAllByText(content =>
          content.includes('End date/time must be after start date/time')
        )
      ).not.toHaveLength(0);
    });
  });
});
