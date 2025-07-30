import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CreateEntity from './CreateEntityZod';

// vi.mock('./hooks/useEntityFormValidation', () => ({
//     default: () => ({
//       validateForm: vi.fn(() => true),
//       validateField: vi.fn(),
//       clearAllErrors: vi.fn(),
//       errors: {},
//     }),
//   }));
describe('CreateEntity', () => {
  afterEach(() => {
    vi.resetModules();
  });

  it('renders all main form fields', () => {
    render(<CreateEntity />);

    expect(screen.getByLabelText(/Kind/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Type/i)[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/Lifecycle/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Owner/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tags/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  it('renders system field when "hasSystem" checkbox is checked', async () => {
    render(<CreateEntity />);

    const checkbox = screen.getByLabelText(/entity belongs to a system/i);

    // TODO check if next field is tags
    expect(screen.queryByTestId('hasSystem')).not.toBeInTheDocument();

    fireEvent.click(checkbox);
    await waitFor(async () =>
      // TODO check if next field is system
      expect(screen.getByTestId('hasSystem')).toBeInTheDocument()
    );
  });

  it('disables the submit button and shows submitting text after submit', async () => {
    vi.resetModules();
    vi.doMock('./hooks/useEntityFormValidation', () => ({
      default: () => ({
        validateForm: vi.fn(() => true),
        validateField: vi.fn(),
        clearAllErrors: vi.fn(),
        errors: {},
      }),
    }));

    const { default: CreateEntity } = await import('./CreateEntityZod');

    render(<CreateEntity />);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(submitButton);

    // This waits for the button text to change
    await waitFor(() =>
      expect(
        screen.queryByRole('button', { name: /submitting/i })
      ).toBeDisabled()
    );
  });

  // it('submits form and shows loader + success alert', async () => {
  //   render(<CreateEntity />);

  //   const submitButton = screen.getByRole('button', { name: /submit/i });
  //   fireEvent.click(submitButton);

  //   await waitFor(async () =>
  //     expect(
  //       await screen.findByRole('button', { name: /submitting/i })
  //     ).toBeInTheDocument()
  //   );
  //   // await waitFor(async () => {
  //   // expect(
  //   //   await screen.findByRole('button', { name: /submitting/i })
  //   // ).toBeInTheDocument();
  //   // expect(
  //   //   screen.queryByText(/het formulier is verzonden/i, {})
  //   // ).toBeInTheDocument();
  //   // });
  // });

  vi.mock('./hooks/useEntityFormValidation', () => ({
    default: () => ({
      validateForm: vi.fn(() => false),
      validateField: vi.fn(),
      clearAllErrors: vi.fn(),
      errors: {},
    }),
  }));

  it('does not submit form when validation fails', () => {
    render(<CreateEntity />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(screen.queryByText(/Submitting/i)).not.toBeInTheDocument();
  });

  it('resets the form on clicking "Reset"', () => {
    render(<CreateEntity />);

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'something-else' },
    });

    expect(screen.getByDisplayValue('something-else')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Reset/i }));

    expect(
      screen.queryByDisplayValue('something-else')
    ).not.toBeInTheDocument();
  });
});
