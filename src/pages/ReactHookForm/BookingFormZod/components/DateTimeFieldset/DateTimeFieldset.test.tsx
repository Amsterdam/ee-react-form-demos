import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import DateTimeFieldset from './DateTimeFieldset';

type FormValues = {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
};

const Wrapper = ({
  children,
  defaultValues = {},
  errors = {},
}: {
  children: React.ReactNode;
  defaultValues?: Partial<FormValues>;
  errors?: Partial<Record<keyof FormValues, { type: string; message: string }>>;
}) => {
  const methods = useForm<FormValues>({
    defaultValues,
    mode: 'onSubmit',
  });

  // Inject errors manually
  Object.entries(errors).forEach(([field, error]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (methods.formState.errors as any)[field] = error;
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('DateTimeFieldset', () => {
  it('renders legend and children', () => {
    render(
      <Wrapper>
        <DateTimeFieldset
          legend="Event timing"
          fields={['startDate', 'startTime']}
        >
          <div>Mock Child</div>
        </DateTimeFieldset>
      </Wrapper>
    );

    expect(screen.getByText('Event timing')).toBeInTheDocument();
    expect(screen.getByText('Mock Child')).toBeInTheDocument();
  });

  it('does not show error when no fields have errors', () => {
    render(
      <Wrapper>
        <DateTimeFieldset
          legend="Event timing"
          fields={['startDate', 'startTime']}
        >
          <div>Mock Child</div>
        </DateTimeFieldset>
      </Wrapper>
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows error for missing required fields (1 field)', () => {
    render(
      <Wrapper
        errors={{
          startDate: { type: 'required', message: 'Start date is required' },
        }}
      >
        <DateTimeFieldset
          legend="Event timing"
          fields={['startDate', 'startTime']}
        >
          <div>Mock Child</div>
        </DateTimeFieldset>
      </Wrapper>
    );

    expect(
      screen.getByText(/start date field is required/i)
    ).toBeInTheDocument();
  });

  it('shows error for missing required fields (2 fields)', () => {
    render(
      <Wrapper
        errors={{
          startDate: { type: 'required', message: 'Start date is required' },
          startTime: { type: 'required', message: 'Start time is required' },
        }}
      >
        <DateTimeFieldset
          legend="Event timing"
          fields={['startDate', 'startTime']}
        >
          <div>Mock Child</div>
        </DateTimeFieldset>
      </Wrapper>
    );

    expect(
      screen.getByText(/fields start date and start time are required/i)
    ).toBeInTheDocument();
  });

  it('shows custom message for invalid field types (e.g., date-time logic)', () => {
    render(
      <Wrapper
        errors={{
          endDate: { type: 'custom', message: 'End must be later than start' },
        }}
      >
        <DateTimeFieldset
          legend="Event timing"
          fields={['startDate', 'startTime', 'endDate', 'endTime']}
        >
          <div>Mock Child</div>
        </DateTimeFieldset>
      </Wrapper>
    );

    expect(
      screen.getByText(/end date and time must be later/i)
    ).toBeInTheDocument();
  });
});
