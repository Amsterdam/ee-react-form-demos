import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookingFormZod from './BookingFormZod';
import { act } from 'react';

describe('BookingFormZod', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    // vi.clearAllTimers();
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders all required inputs and buttons', () => {
    render(<BookingFormZod />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Start date')).toBeInTheDocument();
    expect(screen.getByLabelText('Start time')).toBeInTheDocument();
    expect(screen.getByLabelText('End date')).toBeInTheDocument();
    expect(screen.getByLabelText('End time')).toBeInTheDocument();
    expect(screen.getByLabelText('Is the meeting remote?')).toBeInTheDocument();
    // Use regex lookup as textArea label can include (whitespace and
    // `(niet verplicht)`)
    expect(screen.getByLabelText(/Additional comments/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('validates required fields on submit and shows error messages', async () => {
    render(<BookingFormZod />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => {
      // name, email, 4 sets of datatime fields
      expect(screen.getAllByText(/Invoerfout/i)).toHaveLength(4);
    });
  });

  it('submits valid data and shows success alert after loading', async () => {
    render(<BookingFormZod />);

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Smith' },
    });
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Start date'), {
      target: {
        // Validation will fail if start date is less than today
        value: new Date(Date.now() + 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
      },
    });
    fireEvent.change(screen.getByLabelText('Start time'), {
      target: { value: '09:00' },
    });
    fireEvent.change(screen.getByLabelText('End date'), {
      target: {
        value: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
      },
    });
    fireEvent.change(screen.getByLabelText('End time'), {
      target: { value: '10:00' },
    });
    fireEvent.change(screen.getByLabelText(/Additional comments/i), {
      target: { value: 'Looking forward to it!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Capture first `setIsLoading(true)` render change
    await act(async () => {
      vi.runAllTimers(); // simulate setTimeout call
    });

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await act(async () => {
      vi.runAllTimers(); // simulate setTimeout call
    });

    expect(
      await screen.findByText(/the form has been sent/i)
    ).toBeInTheDocument();
  });

  it('resets all fields when reset button is clicked', async () => {
    render(<BookingFormZod />);

    const nameInput = screen.getByLabelText('Name');
    fireEvent.input(nameInput, { target: { value: 'Someone' } });
    expect(nameInput).toHaveValue('Someone');

    fireEvent.click(screen.getByRole('button', { name: /reset/i }));
    expect(nameInput).toHaveValue(''); // resets to default
  });

  it('shows error when end time is before start time', async () => {
    render(<BookingFormZod />);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Smith' },
    });
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Start date'), {
      target: {
        // Validation will fail if start date is less than today
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
    fireEvent.change(screen.getByLabelText(/Additional comments/i), {
      target: { value: 'Looking forward to it!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/end date and time must be later/i)
      ).toBeInTheDocument();
    });
  });
});
