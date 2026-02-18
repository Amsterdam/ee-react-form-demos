import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import DateControl from './DateControl';

type FormValues = {
  birthDate: string;
};

const Wrapper = ({
  children,
  defaultValues = { birthDate: '' },
}: {
  children: React.ReactNode;
  defaultValues?: Partial<FormValues>;
}) => {
  const methods = useForm<FormValues>({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('ReactHookForm / BookingFormZod - DateControl', () => {
  it('renders with label and input', () => {
    render(
      <Wrapper>
        <DateControl<FormValues> name="birthDate" label="Date of Birth" />
      </Wrapper>
    );

    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();
  });

  it('handles user input', () => {
    render(
      <Wrapper>
        <DateControl<FormValues> name="birthDate" label="Date of Birth" />
      </Wrapper>
    );

    const input = screen.getByLabelText(/date of birth/i) as HTMLInputElement;
    expect(input.value).toBe('');

    fireEvent.input(input, { target: { value: '2000-01-01' } });
    expect(input.value).toBe('2000-01-01');
  });

  it('renders initial value', () => {
    render(
      <Wrapper defaultValues={{ birthDate: '1990-12-25' }}>
        <DateControl<FormValues> name="birthDate" label="Date of Birth" />
      </Wrapper>
    );

    const input = screen.getByLabelText(/date of birth/i) as HTMLInputElement;
    expect(input.value).toBe('1990-12-25');
  });

  it('renders description', () => {
    render(
      <Wrapper>
        <DateControl<FormValues>
          name="birthDate"
          label="Date of Birth"
          description="Please enter your birth date."
        />
      </Wrapper>
    );

    expect(
      screen.getByText(/please enter your birth date/i)
    ).toBeInTheDocument();
  });

  it('shows description id in aria-describedby', () => {
    render(
      <Wrapper>
        <DateControl<FormValues>
          name="birthDate"
          label="Date of Birth"
          description="We need this to verify your age."
        />
      </Wrapper>
    );

    const input = screen.getByLabelText(/date of birth/i) as HTMLInputElement;
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toMatch(/birthDate-description/);

    expect(screen.getByText(/verify your age/i)).toBeInTheDocument();
  });
});
