import { fireEvent, render, screen } from '@testing-library/react';
import StepConfirm from './StepConfirm';
import { vi } from 'vitest';

describe('StepConfirm', () => {
  const mockOnChange = vi.fn();
  const mockOnPrevButtonClick = vi.fn();

  const baseFormData = {
    name: 'John Doe',
    email: 'john@example.com',
    startDate: '2025-11-12',
    startTime: '10:00',
    endDate: '2025-11-12',
    endTime: '11:00',
    comments: '',
  };

  const defaultProps = {
    formData: baseFormData,
    disabled: false,
    onChange: mockOnChange,
    onPrevButtonClick: mockOnPrevButtonClick,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders step heading and key UI elements', () => {
    render(<StepConfirm {...defaultProps} />);

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
    render(<StepConfirm {...defaultProps} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText(/12 november 2025 om 10:00/)).toBeInTheDocument();
    expect(screen.getByText(/12 november 2025 om 11:00/)).toBeInTheDocument();
  });

  it('calls onPrevButtonClick when clicking "Vorige vraag"', () => {
    render(<StepConfirm {...defaultProps} />);
    fireEvent.click(screen.getByRole('link', { name: /vorige vraag/i }));
    expect(mockOnPrevButtonClick).toHaveBeenCalledTimes(1);
  });

  it('calls onChange when typing in textarea', () => {
    render(<StepConfirm {...defaultProps} />);
    const textarea = screen.getByLabelText(/opmerkingen/i);
    fireEvent.change(textarea, { target: { value: 'Extra note' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('disables textarea and updates submit button when isSubmitting=true', () => {
    render(<StepConfirm {...defaultProps} isSubmitting />);
    expect(screen.getByLabelText(/opmerkingen/i)).toBeDisabled();
    expect(screen.getByRole('button', { name: /verzenden/i })).toHaveAttribute(
      'aria-busy',
      'true'
    );
  });
});
