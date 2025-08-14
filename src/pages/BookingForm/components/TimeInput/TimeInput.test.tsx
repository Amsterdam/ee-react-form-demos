import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TimeInput from './TimeInput';

describe('TimeInput', () => {
  const defaultProps = {
    id: 'test-time',
    label: 'Test Label',
    name: 'testTimeInput',
    value: '',
    onChange: vi.fn(),
  };

  it('renders with label and input', () => {
    render(<TimeInput {...defaultProps} />);

    expect(screen.getByLabelText(defaultProps.label)).toBeInTheDocument();
    expect(screen.getByLabelText(defaultProps.label)).toHaveAttribute(
      'id',
      'test-time'
    );
    expect(screen.getByLabelText(defaultProps.label)).toHaveAttribute(
      'name',
      'testTimeInput'
    );
  });

  it('handles user input', () => {
    const mockOnChange = vi.fn();
    render(<TimeInput {...defaultProps} onChange={mockOnChange} />);

    const input = screen.getByLabelText(defaultProps.label);
    fireEvent.change(input, {
      target: {
        value: '09:00',
      },
    });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('displays validation errors', () => {
    const errorMessage = 'This field is required';
    render(<TimeInput {...defaultProps} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByLabelText(defaultProps.label)).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('test-time-error')
    );
  });

  it('renders with initial value', () => {
    const time = '09:00';
    render(<TimeInput {...defaultProps} value={time} />);

    expect(screen.getByDisplayValue(time)).toBeInTheDocument();
  });

  it('renders description', () => {
    const description = (
      <span data-testid="custom-description">Custom description</span>
    );
    render(<TimeInput {...defaultProps} description={description} />);

    expect(screen.getByTestId('custom-description')).toBeInTheDocument();
  });

  it('shows description id in aria-describedby', () => {
    const description = 'This is a description';
    render(<TimeInput {...defaultProps} description={description} required />);

    const input = screen.getByLabelText(defaultProps.label);

    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('test-time-description')
    );
    expect(screen.getByText(description)).toHaveAttribute(
      'id',
      'test-time-description'
    );
  });

  it('combines description and error in aria-describedby', () => {
    render(
      <TimeInput {...defaultProps} description="Description" error="Error" />
    );

    const input = screen.getByLabelText(defaultProps.label);
    const describedBy = input.getAttribute('aria-describedby');

    expect(describedBy).toContain('test-time-description');
    expect(describedBy).toContain('test-time-error');
  });
});
