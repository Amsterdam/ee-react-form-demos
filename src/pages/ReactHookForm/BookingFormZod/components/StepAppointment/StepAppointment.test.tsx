import { vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import StepAppointment from './StepAppointment';
import { BookingFormData } from '../../schema';
import { ReactElement } from 'react';

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

describe('ReactHookForm / BookingFormZod - StepAppointment', () => {
  const mockOnPrevButtonClick = vi.fn();
  const mockOnNextButtonClick = vi.fn();

  const defaultProps = {
    minDateValue: '2025-01-01',
    onPrevButtonClick: mockOnPrevButtonClick,
    onNextButtonClick: mockOnNextButtonClick,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders key elements', () => {
    renderWithForm(<StepAppointment {...defaultProps} />);
    expect(screen.getByText(/afspraak maken/i)).toBeInTheDocument();
    expect(screen.getByText(/stap 2 van 3: afspraak/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /volgende vraag/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /vorige vraag/i })
    ).toBeInTheDocument();
  });

  it('passes minDateValue to startDate input', () => {
    renderWithForm(<StepAppointment {...defaultProps} />);
    const startDateInput = screen.getByLabelText(/startdatum/i);
    expect(startDateInput).toHaveAttribute('min', '2025-01-01');
  });

  it('shows validation errors after clicking "Volgende vraag"', async () => {
    renderWithForm(<StepAppointment {...defaultProps} />);

    expect(screen.queryByText(/verplicht/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /volgende vraag/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/verplicht/i).length).toBeGreaterThan(0);
    });
  });

  it('calls onNextButtonClick when form is valid', async () => {
    renderWithForm(<StepAppointment {...defaultProps} />, {
      startDate: '2025-01-10',
      startTime: '09:00',
      endDate: '2025-01-10',
      endTime: '10:00',
    });

    fireEvent.click(screen.getByRole('button', { name: /volgende vraag/i }));

    await waitFor(() => {
      expect(mockOnNextButtonClick).toHaveBeenCalledTimes(1);
    });
  });

  it('calls onPrevButtonClick and clears errors when clicking "Vorige vraag"', async () => {
    renderWithForm(<StepAppointment {...defaultProps} />);
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
});
