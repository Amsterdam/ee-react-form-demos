// StepAppointment.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import StepAppointment from './StepAppointment';
import { vi } from 'vitest';

describe('StepAppointment', () => {
  const mockOnChange = vi.fn();
  const mockOnPrevButtonClick = vi.fn();
  const mockOnNextButtonClick = vi.fn();

  const defaultProps = {
    formData: {
      name: '',
      email: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      comments: '',
    },
    minDateValue: '2025-01-01',
    errors: {},
    disabled: false,
    onChange: mockOnChange,
    onPrevButtonClick: mockOnPrevButtonClick,
    onNextButtonClick: mockOnNextButtonClick,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders key elements', () => {
    render(<StepAppointment {...defaultProps} />);
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
    render(<StepAppointment {...defaultProps} />);
    const startDateInput = screen.getByLabelText(/startdatum/i);
    expect(startDateInput).toHaveAttribute('min', '2025-01-01');
  });

  it('calls onChange when changing an input', () => {
    render(<StepAppointment {...defaultProps} />);
    const startDateInput = screen.getByLabelText(/startdatum/i);
    fireEvent.change(startDateInput, { target: { value: '2025-01-02' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('does not show errors before submit', () => {
    render(<StepAppointment {...defaultProps} />);
    expect(screen.queryByText(/invalidformalert/i)).not.toBeInTheDocument();
  });

  it('shows errors after clicking next', () => {
    const propsWithErrors = {
      ...defaultProps,
      errors: {
        startDate: 'Startdatum is verplicht',
        endTime: 'Eindtijd is verplicht',
      },
    };
    render(<StepAppointment {...propsWithErrors} />);
    fireEvent.click(screen.getByRole('button', { name: /volgende vraag/i }));
    // We don’t assert exact text structure — just that errors are shown
    expect(screen.getAllByText(/verplicht/i).length).toBeGreaterThan(0);
  });

  it('calls onPrevButtonClick when clicking "Vorige vraag"', () => {
    render(<StepAppointment {...defaultProps} />);
    fireEvent.click(screen.getByRole('link', { name: /vorige vraag/i }));
    expect(mockOnPrevButtonClick).toHaveBeenCalledTimes(1);
  });

  it('calls onNextButtonClick when clicking "Volgende vraag"', () => {
    render(<StepAppointment {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /volgende vraag/i }));
    expect(mockOnNextButtonClick).toHaveBeenCalledTimes(1);
  });
});
