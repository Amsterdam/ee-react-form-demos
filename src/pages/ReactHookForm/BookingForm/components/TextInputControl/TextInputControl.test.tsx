import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import TextInputControl from './TextInputControl';

type FormValues = {
  name: string;
};

const Wrapper = ({
  children,
  defaultValues = { name: '' },
}: {
  children: React.ReactNode;
  defaultValues?: Partial<FormValues>;
}) => {
  const methods = useForm<FormValues>({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('TextInputControl', () => {
  it('renders with label and input', () => {
    render(
      <Wrapper>
        <TextInputControl<FormValues>
          name="name"
          label="Full Name"
          testId="name"
        />
      </Wrapper>
    );

    const input = screen.getByLabelText(/Full Name/i);
    expect(input).toBeInTheDocument();
  });

  it('handles user input', () => {
    render(
      <Wrapper>
        <TextInputControl<FormValues>
          name="name"
          label="Full Name"
          testId="name"
        />
      </Wrapper>
    );

    const input = screen.getByLabelText(/Full Name/i) as HTMLInputElement;
    expect(input.value).toBe('');

    fireEvent.input(input, { target: { value: 'Alice' } });
    expect(input.value).toBe('Alice');
  });

  it('renders with initial value', () => {
    render(
      <Wrapper defaultValues={{ name: 'Bob' }}>
        <TextInputControl<FormValues>
          name="name"
          label="Full Name"
          testId="name"
        />
      </Wrapper>
    );

    const input = screen.getByLabelText(/Full Name/i) as HTMLInputElement;
    expect(input.value).toBe('Bob');
  });

  it('renders description when provided as string', () => {
    render(
      <Wrapper>
        <TextInputControl<FormValues>
          name="name"
          label="Full Name"
          description="Please enter your full legal name."
          testId="name"
        />
      </Wrapper>
    );

    expect(
      screen.getByText(/please enter your full legal name/i)
    ).toBeInTheDocument();
  });

  it('shows description id in aria-describedby', () => {
    render(
      <Wrapper>
        <TextInputControl<FormValues>
          name="name"
          label="Full Name"
          description="Used for formal identification."
          testId="name"
        />
      </Wrapper>
    );

    const input = screen.getByLabelText(/Full Name/i);
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toMatch(/name-description/);

    expect(screen.getByTestId('name-description')).toHaveTextContent(
      /used for formal identification/i
    );
  });

  it('shows error message when invalid', async () => {
    const Component = () => {
      const methods = useForm<FormValues>({
        defaultValues: { name: '' },
        mode: 'onSubmit',
      });

      const onSubmit = vi.fn();

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <TextInputControl<FormValues>
              name="name"
              label="Full Name"
              registerOptions={{ required: 'Name is required' }}
              testId="name"
            />
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    };

    render(<Component />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(/name is required/i)).toBeVisible();

    const input = screen.getByLabelText(/Full Name/i);
    expect(input.getAttribute('aria-describedby')).toMatch(/name-error/);
  });
});
