import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import CheckboxControl from './CheckboxControl';

type FormValues = {
  remote: boolean;
};

const Wrapper = ({
  children,
  defaultValues = { remote: false },
}: {
  children: React.ReactNode;
  defaultValues?: Partial<FormValues>;
}) => {
  const methods = useForm<FormValues>({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('CheckboxControl', () => {
  it('renders with label and input', () => {
    render(
      <Wrapper>
        <CheckboxControl<FormValues>
          name="remote"
          label="is the meeting remote?"
          testId="remote"
        />
      </Wrapper>
    );

    const checkbox = screen.getByTestId('remote') as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.type).toBe('checkbox');
    expect(screen.getByLabelText(/is the meeting remote/i)).toBe(checkbox);
  });

  it('handles user input', () => {
    render(
      <Wrapper>
        <CheckboxControl<FormValues>
          name="remote"
          label="is the meeting remote?"
          testId="remote"
        />
      </Wrapper>
    );

    const checkbox = screen.getByTestId('remote') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  it('renders initial value', () => {
    render(
      <Wrapper defaultValues={{ remote: true }}>
        <CheckboxControl<FormValues>
          name="remote"
          label="is the meeting remote?"
          testId="remote"
        />
      </Wrapper>
    );

    const checkbox = screen.getByTestId('remote') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('renders description', () => {
    render(
      <Wrapper>
        <CheckboxControl<FormValues>
          name="remote"
          label="is the meeting remote?"
          description="For remote meetings a video call invite will be sent in advance"
          testId="remote"
        />
      </Wrapper>
    );

    expect(
      screen.getByText(
        /For remote meetings a video call invite will be sent in advance/i
      )
    ).toBeInTheDocument();
  });

  it('shows description id in aria-describedby', () => {
    render(
      <Wrapper>
        <CheckboxControl<FormValues>
          name="remote"
          label="is the meeting remote?"
          description="For remote meetings a video call invite will be sent in advance"
          testId="remote"
        />
      </Wrapper>
    );

    const checkbox = screen.getByTestId('remote');
    const describedBy = checkbox.getAttribute('aria-describedby');
    expect(describedBy).toMatch(/remote-description/);
    expect(screen.getByTestId('remote-description')).toHaveTextContent(
      /For remote meetings a video call invite will be sent in advance/
    );
  });

  it('shows error message when invalid', async () => {
    const Component = () => {
      const methods = useForm<FormValues>({
        defaultValues: { remote: false },
        mode: 'onSubmit',
      });

      const onSubmit = vi.fn();

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <CheckboxControl<FormValues>
              name="remote"
              label="is the meeting remote?"
              registerOptions={{
                required:
                  'For remote meetings a video call invite will be sent in advance',
              }}
              testId="remote"
            />
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    };

    render(<Component />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(
      await screen.findByText(
        /For remote meetings a video call invite will be sent in advance/i
      )
    ).toBeVisible();

    const checkbox = screen.getByTestId('remote');
    expect(checkbox.getAttribute('aria-describedby')).toMatch(/remote-error/);
  });
});
