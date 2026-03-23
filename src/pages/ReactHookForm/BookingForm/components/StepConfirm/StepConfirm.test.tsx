import { fireEvent, render, screen } from '@testing-library/react';
import StepConfirm from './StepConfirm';
import { vi } from 'vitest';
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

describe('ReactHookForm / BookingForm - StepConfirm', () => {
  const mockOnPrevButtonClick = vi.fn();
  const mockOnSubmit = vi.fn();

  const defaultProps = {
    isSubmitting: false,
    onPrevButtonClick: mockOnPrevButtonClick,
    onSubmit: mockOnSubmit,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders step heading and key UI elements', () => {
    renderWithForm(<StepConfirm {...defaultProps} />);

    expect(screen.getByText(/afspraak maken/i)).toBeInTheDocument();
    expect(screen.getByText(/stap 3 van 3/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /vorige vraag/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /verzenden/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/opmerkingen/i)).toBeInTheDocument();
  });

  it('renders confirmation table with correct data', () => {
    renderWithForm(<StepConfirm {...defaultProps} />, {
      name: 'John Doe',
      email: 'john@example.com',
      startDate: '2025-11-12',
      startTime: '10:00',
      endDate: '2025-11-12',
      endTime: '11:00',
    });
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText(/12 november 2025 om 10:00/)).toBeInTheDocument();
    expect(screen.getByText(/12 november 2025 om 11:00/)).toBeInTheDocument();
  });

  it('calls onPrevButtonClick when clicking "Vorige vraag"', () => {
    renderWithForm(<StepConfirm {...defaultProps} />);
    fireEvent.click(screen.getByRole('link', { name: /vorige vraag/i }));
    expect(mockOnPrevButtonClick).toHaveBeenCalledTimes(1);
  });
});
