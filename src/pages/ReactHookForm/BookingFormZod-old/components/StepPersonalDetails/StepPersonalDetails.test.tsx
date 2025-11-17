import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import StepPersonalDetails from './StepPersonalDetails';
import { FormProvider, useForm } from 'react-hook-form';
import { ReactElement } from 'react';
import { BookingFormData } from '../../BookingForm';

const renderWithForm = (
  ui: ReactElement,
  defaultValues?: Partial<BookingFormData>
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm<BookingFormData>({
      defaultValues: {
        name: '',
        email: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        comments: '',
        ...defaultValues,
      },
    });

    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return render(ui, { wrapper: Wrapper });
};

describe('ReactHookForm / BookingFormZod - StepPersonalDetails', () => {
  const mockOnPrevButtonClick = vi.fn();
  const mockOnNextButtonClick = vi.fn();

  const defaultProps = {
    disabled: false,
    onPrevButtonClick: mockOnPrevButtonClick,
    onNextButtonClick: mockOnNextButtonClick,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all key elements', () => {
    renderWithForm(<StepPersonalDetails {...defaultProps} />);
    expect(screen.getByLabelText(/afspraak maken/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/voornaam/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mailadres/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /volgende vraag/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /vorige vraag/i })
    ).toBeInTheDocument();
  });

  it('shows validation errors after clicking "Volgende vraag"', async () => {
    renderWithForm(<StepPersonalDetails {...defaultProps} />);

    expect(screen.queryByText(/verplicht/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /volgende vraag/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/verplicht/i).length).toBeGreaterThan(0);
    });
  });

  it('calls onPrevButtonClick and clears errors when clicking "Vorige vraag"', async () => {
    renderWithForm(<StepPersonalDetails {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /volgende vraag/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/verplicht/i).length).toBeGreaterThan(0);
    });

    fireEvent.click(screen.getByRole('link', { name: /vorige vraag/i }));
    expect(mockOnPrevButtonClick).toHaveBeenCalledTimes(1);

    // Ensure errors are cleared on return
    await waitFor(() => {
      expect(screen.queryByText(/verplicht/i)).not.toBeInTheDocument();
    });
  });

  it('calls onNextButtonClick when form is valid', async () => {
    renderWithForm(<StepPersonalDetails {...defaultProps} />, {
      name: 'John Doe',
      email: 'john@example.com',
    });

    fireEvent.click(screen.getByRole('button', { name: /volgende vraag/i }));

    await waitFor(() => {
      expect(mockOnNextButtonClick).toHaveBeenCalledTimes(1);
    });
  });
});
