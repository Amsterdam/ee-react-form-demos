import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import TextAreaControl from './TextAreaControl';
import userEvent from '@testing-library/user-event';

type FormValues = {
  message: string;
};

const Wrapper = ({
  children,
  defaultValues = { message: '' },
}: {
  children: React.ReactNode;
  defaultValues?: Partial<FormValues>;
}) => {
  const methods = useForm<FormValues>({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('TextAreaControl', () => {
  it('renders with label and textarea', () => {
    render(
      <Wrapper>
        <TextAreaControl<FormValues>
          name="message"
          label="Your Message"
          testId="message"
        />
      </Wrapper>
    );

    // Use regex lookup as textArea label can include (whitespace and
    // `(niet verplicht)`)
    const textarea = screen.getByLabelText(/Your Message/i);
    expect(textarea).toBeInTheDocument();
  });

  it('handles user textarea', async () => {
    render(
      <Wrapper>
        <TextAreaControl<FormValues>
          name="message"
          label="Your Message"
          testId="message"
        />
      </Wrapper>
    );

    // Use regex lookup as textArea label can include (whitespace and
    // `(niet verplicht)`)
    const textarea = screen.getByLabelText(
      /Your Message/i
    ) as HTMLTextAreaElement;
    expect(textarea.value).toBe('');

    await userEvent.type(
      textarea,
      'Lorem ipsum dolor sit amet. Qui molestiae laudantium in velit blanditiis sed sequi reprehenderit et minus unde nam fugit aperiam. Sit aliquid sapiente non odio accusamus eum modi galisum. Et voluptatem facilis eum rerum dolores aut ducimus expedita cum consectetur quidem.'
    );
    expect(textarea.value).toBe(
      'Lorem ipsum dolor sit amet. Qui molestiae laudantium in velit blanditiis sed sequi reprehenderit et minus unde nam fugit aperiam. Sit aliquid sapiente non odio accusamus eum modi galisum. Et voluptatem facilis eum rerum dolores aut ducimus expedita cum consectetur quidem.'
    );
  });

  it('renders with initial value', () => {
    render(
      <Wrapper
        defaultValues={{
          message:
            'A placeat harum est sint eaque et aperiam quis et voluptas deleniti id expedita modi aut magnam minima. Vel quaerat dolores ut explicabo similique aut expedita molestiae quo doloremque temporibus ut veniam quos.',
        }}
      >
        <TextAreaControl<FormValues>
          name="message"
          label="Your Message"
          testId="message"
        />
      </Wrapper>
    );

    // Use regex lookup as textArea label can include (whitespace and
    // `(niet verplicht)`)
    const textarea = screen.getByLabelText(
      /Your Message/i
    ) as HTMLTextAreaElement;
    expect(textarea.value).toBe(
      'A placeat harum est sint eaque et aperiam quis et voluptas deleniti id expedita modi aut magnam minima. Vel quaerat dolores ut explicabo similique aut expedita molestiae quo doloremque temporibus ut veniam quos.'
    );
  });

  it('renders description when provided as string', () => {
    render(
      <Wrapper>
        <TextAreaControl<FormValues>
          name="message"
          label="Your Message"
          description="Please enter your full legal name."
          testId="message"
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
        <TextAreaControl<FormValues>
          name="message"
          label="Your Message"
          description="Send us your ideas."
          testId="message"
        />
      </Wrapper>
    );

    // Use regex lookup as textArea label can include (whitespace and
    // `(niet verplicht)`)
    const textarea = screen.getByLabelText(/Your Message/i);
    const describedBy = textarea.getAttribute('aria-describedby');
    expect(describedBy).toMatch(/message-description/);

    expect(screen.getByTestId('message-description')).toHaveTextContent(
      /Send us your ideas/i
    );
  });

  it('shows error message when invalid', async () => {
    const Component = () => {
      const methods = useForm<FormValues>({
        defaultValues: { message: '' },
        mode: 'onSubmit',
      });

      const onSubmit = vi.fn();

      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <TextAreaControl<FormValues>
              name="message"
              label="Your Message"
              registerOptions={{ required: 'Message is required' }}
              testId="message"
            />
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      );
    };

    render(<Component />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(/Message is required/i)).toBeVisible();

    // Use regex lookup as textArea label can include (whitespace and
    // `(niet verplicht)`)
    const textarea = screen.getByLabelText(/Your Message/i);
    expect(textarea.getAttribute('aria-describedby')).toMatch(/message-error/);
  });
});
