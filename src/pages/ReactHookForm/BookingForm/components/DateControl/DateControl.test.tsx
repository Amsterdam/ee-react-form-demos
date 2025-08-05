import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
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

describe('DateControl', () => {
  it('renders with label and input', () => {
    render(
      <Wrapper>
        <DateControl<FormValues>
          name="birthDate"
          label="Date of Birth"
          testId="birthDate"
        />
      </Wrapper>
    );

    const input = screen.getByTestId('birthDate') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(screen.getByLabelText(/date of birth/i)).toBe(input);
  });

  it('handles user input', () => {
    render(
      <Wrapper>
        <DateControl<FormValues>
          name="birthDate"
          label="Date of Birth"
          testId="birthDate"
        />
      </Wrapper>
    );

    const input = screen.getByTestId('birthDate') as HTMLInputElement;
    expect(input.value).toBe('');

    fireEvent.input(input, { target: { value: '2000-01-01' } });
    expect(input.value).toBe('2000-01-01');
  });

  it('renders initial value', () => {
    render(
      <Wrapper defaultValues={{ birthDate: '1990-12-25' }}>
        <DateControl<FormValues>
          name="birthDate"
          label="Date of Birth"
          testId="birthDate"
        />
      </Wrapper>
    );

    const input = screen.getByTestId('birthDate') as HTMLInputElement;
    expect(input.value).toBe('1990-12-25');
  });

  it('renders description', () => {
    render(
      <Wrapper>
        <DateControl<FormValues>
          name="birthDate"
          label="Date of Birth"
          description="Please enter your birth date."
          testId="birthDate"
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
          testId="birthDate"
        />
      </Wrapper>
    );

    const input = screen.getByTestId('birthDate');
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toMatch(/birthDate-description/);

    expect(screen.getByTestId('birthDate-description')).toHaveTextContent(
      /verify your age/i
    );
  });

  it('shows error message when invalid', async () => {
    const Component = () => {
      const methods = useForm<FormValues>({
        defaultValues: { birthDate: '' },
        mode: 'onSubmit',
      });

      const onSubmit = vi.fn();

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <DateControl<FormValues>
              name="birthDate"
              label="Date of Birth"
              registerOptions={{ required: 'Birth date is required' }}
              testId="birthDate"
            />
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    };

    render(<Component />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      const input = screen.getByTestId('birthDate');
      expect(input.getAttribute('aria-describedby')).toMatch(/birthDate-error/);
    });
  });
});
