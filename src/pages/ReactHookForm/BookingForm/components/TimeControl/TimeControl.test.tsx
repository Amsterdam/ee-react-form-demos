import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import TimeControl from './TimeControl';

type FormValues = {
  startTime: string;
};

const Wrapper = ({
  children,
  defaultValues = { startTime: '' },
}: {
  children: React.ReactNode;
  defaultValues?: Partial<FormValues>;
}) => {
  const methods = useForm<FormValues>({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('TimeControl', () => {
  it('renders with label and input', () => {
    render(
      <Wrapper>
        <TimeControl<FormValues>
          name="startTime"
          label="Start time"
          testId="startTime"
        />
      </Wrapper>
    );

    const input = screen.getByTestId('startTime') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(screen.getByLabelText(/Start time/i)).toBe(input);
  });

  it('handles user input', () => {
    render(
      <Wrapper>
        <TimeControl<FormValues>
          name="startTime"
          label="Start time"
          testId="startTime"
        />
      </Wrapper>
    );

    const input = screen.getByTestId('startTime') as HTMLInputElement;
    expect(input.value).toBe('');

    fireEvent.input(input, { target: { value: '12:02' } });
    expect(input.value).toBe('12:02');
  });

  it('renders initial value', () => {
    render(
      <Wrapper defaultValues={{ startTime: '12:02' }}>
        <TimeControl<FormValues>
          name="startTime"
          label="Start time"
          testId="startTime"
        />
      </Wrapper>
    );

    const input = screen.getByTestId('startTime') as HTMLInputElement;
    expect(input.value).toBe('12:02');
  });

  it('renders description', () => {
    render(
      <Wrapper>
        <TimeControl<FormValues>
          name="startTime"
          label="Start time"
          description="Please enter a start time."
          testId="startTime"
        />
      </Wrapper>
    );

    expect(screen.getByText(/please enter a start time/i)).toBeInTheDocument();
  });

  it('shows description id in aria-describedby', () => {
    render(
      <Wrapper>
        <TimeControl<FormValues>
          name="startTime"
          label="Start time"
          description="We need this to verify your age."
          testId="startTime"
        />
      </Wrapper>
    );

    const input = screen.getByTestId('startTime');
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toMatch(/startTime-description/);

    expect(screen.getByTestId('startTime-description')).toHaveTextContent(
      /verify your age/i
    );
  });

  it('shows error message when invalid', async () => {
    const Component = () => {
      const methods = useForm<FormValues>({
        defaultValues: { startTime: '' },
        mode: 'onSubmit',
      });

      const onSubmit = vi.fn();

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <TimeControl<FormValues>
              name="startTime"
              label="Start time"
              registerOptions={{ required: 'Start time is required' }}
              testId="startTime"
            />
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    };

    render(<Component />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      const input = screen.getByTestId('startTime');
      expect(input.getAttribute('aria-describedby')).toMatch(/startTime-error/);
    });
  });
});
