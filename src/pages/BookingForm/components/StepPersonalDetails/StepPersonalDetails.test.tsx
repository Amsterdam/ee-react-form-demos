import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import StepPersonalDetails from './StepPersonalDetails';

describe('StepPersonalDetails', () => {
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
    errors: {},
    disabled: false,
    onChange: mockOnChange,
    onPrevButtonClick: mockOnPrevButtonClick,
    onNextButtonClick: mockOnNextButtonClick,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all key elements', () => {
    render(<StepPersonalDetails {...defaultProps} />);
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

  it('does not show validation errors before submit', () => {
    render(<StepPersonalDetails {...defaultProps} />);
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  it('shows validation errors after clicking "Volgende vraag"', () => {
    const propsWithErrors = {
      ...defaultProps,
      errors: { name: 'Voornaam is verplicht', email: 'E-mail is verplicht' },
    };
    render(<StepPersonalDetails {...propsWithErrors} />);

    // Initially no errors
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();

    // Click next
    fireEvent.click(screen.getByRole('button', { name: /volgende vraag/i }));

    // Errors should appear
    expect(screen.getAllByTestId('error-message')).toHaveLength(2);
    expect(screen.getAllByText('Voornaam is verplicht').length).toBeGreaterThan(
      0
    );
    expect(screen.getAllByText('E-mail is verplicht').length).toBeGreaterThan(
      0
    );
  });

  it('calls onChange when typing in inputs', () => {
    render(<StepPersonalDetails {...defaultProps} />);
    const nameInput = screen.getByLabelText(/voornaam/i);
    fireEvent.change(nameInput, { target: { value: 'John' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('calls onPrevButtonClick when clicking "Vorige vraag"', () => {
    render(<StepPersonalDetails {...defaultProps} />);
    fireEvent.click(screen.getByRole('link', { name: /vorige vraag/i }));
    expect(mockOnPrevButtonClick).toHaveBeenCalledTimes(1);
  });

  it('calls onNextButtonClick when clicking "Volgende vraag"', () => {
    render(<StepPersonalDetails {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /volgende vraag/i }));
    expect(mockOnNextButtonClick).toHaveBeenCalledTimes(1);
  });
});
