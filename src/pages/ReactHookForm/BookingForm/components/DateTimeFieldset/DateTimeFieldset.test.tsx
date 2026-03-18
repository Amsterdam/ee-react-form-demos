import { render, screen } from '@testing-library/react';
import { useFormContext } from 'react-hook-form';
import { vi } from 'vitest';
import DateTimeFieldset from './DateTimeFieldset';

// Mock react-hook-form
vi.mock('react-hook-form', () => ({
  useFormContext: vi.fn(),
}));

describe('ReactHookForm / BookingForm - DateTimeFieldset', () => {
  it('renders the fieldset with legend and children', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useFormContext as any).mockReturnValue({
      formState: { errors: {} },
    });

    render(
      <DateTimeFieldset
        legend="Test legend"
        fields={['startDate', 'startTime']}
      >
        <input data-testid="child-input" />
      </DateTimeFieldset>
    );

    expect(screen.getByText('Test legend')).toBeInTheDocument();
    expect(screen.getByTestId('child-input')).toBeInTheDocument();
  });

  it('does not show an error message if there are no errors', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useFormContext as any).mockReturnValue({
      formState: { errors: {} },
    });

    render(
      <DateTimeFieldset
        legend="Test legend"
        fields={['startDate', 'startTime']}
      >
        <input data-testid="child-input" />
      </DateTimeFieldset>
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows required field error message', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useFormContext as any).mockReturnValue({
      formState: {
        errors: {
          startDate: { type: 'required', message: 'Vul een startdatum in' },
          startTime: { type: 'required', message: 'Vul een starttijd in' },
        },
      },
    });

    render(
      <DateTimeFieldset
        legend="Test legend"
        fields={['startDate', 'startTime']}
      >
        <input data-testid="child-input" />
      </DateTimeFieldset>
    );

    expect(
      screen.getByText('Vul een Startdatum en Starttijd in.')
    ).toBeInTheDocument();
  });

  it('shows invalid date/time error message', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useFormContext as any).mockReturnValue({
      formState: {
        errors: {
          endDate: { type: 'validate', message: 'Invalid' },
        },
      },
    });

    render(
      <DateTimeFieldset legend="End DateTime" fields={['endDate', 'endTime']}>
        <input data-testid="child-input" />
      </DateTimeFieldset>
    );

    expect(
      screen.getByText(
        'De einddatum en -tijd moeten later zijn dan de startdatum en -tijd'
      )
    ).toBeInTheDocument();
  });
});
