import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import FormDateInput from './FormDateInput';

describe('DateInput', () => {
  const defaultProps = {
    id: 'test-date',
    label: 'Test Label',
    name: 'testDateInput',
    value: '',
    onChange: vi.fn(),
  };

  it('renders with label and input', () => {
    render(<FormDateInput {...defaultProps} />);

    expect(screen.getByLabelText(defaultProps.label)).toBeInTheDocument();
    expect(screen.getByLabelText(defaultProps.label)).toHaveAttribute(
      'id',
      'test-date'
    );
    expect(screen.getByLabelText(defaultProps.label)).toHaveAttribute(
      'name',
      'testDateInput'
    );
  });

  it('handles user input', () => {
    const mockOnChange = vi.fn();
    render(<FormDateInput {...defaultProps} onChange={mockOnChange} />);

    const input = screen.getByLabelText(defaultProps.label);
    fireEvent.change(input, {
      target: {
        value: new Date(Date.now() + 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
      },
    });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('displays validation errors', () => {
    render(<FormDateInput {...defaultProps} error />);

    expect(screen.getByLabelText(defaultProps.label)).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('test-date-error')
    );
  });

  it('renders with initial value', () => {
    const date = new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];
    render(<FormDateInput {...defaultProps} value={date} />);

    expect(screen.getByDisplayValue(date)).toBeInTheDocument();
  });

  it('renders description', () => {
    const description = (
      <span data-testid="custom-description">Custom description</span>
    );
    render(<FormDateInput {...defaultProps} description={description} />);

    expect(screen.getByTestId('custom-description')).toBeInTheDocument();
  });

  it('shows description id in aria-describedby', () => {
    const description = 'This is a description';
    render(<FormDateInput {...defaultProps} description={description} />);

    const input = screen.getByLabelText(defaultProps.label);

    expect(input).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('test-date-description')
    );
    expect(screen.getByText(description).parentElement).toHaveAttribute(
      'id',
      'test-date-description'
    );
  });
});
