import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import FormTimeInput from './FormTimeInput';

describe('FormTimeInput', () => {
  const defaultProps = {
    id: 'test-time',
    label: 'Test Label',
    name: 'testTimeInput',
    value: '',
    onChange: vi.fn(),
  };

  it('renders with label and input', () => {
    render(<FormTimeInput {...defaultProps} />);

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
    render(<FormTimeInput {...defaultProps} onChange={mockOnChange} />);

    const input = screen.getByLabelText(defaultProps.label);
    fireEvent.change(input, {
      target: {
        value: '09:00',
      },
    });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('displays validation errors', () => {
    render(<FormTimeInput {...defaultProps} error />);

    expect(screen.getByLabelText(defaultProps.label)).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('test-time-error')
    );
  });

  it('renders with initial value', () => {
    const time = '09:00';
    render(<FormTimeInput {...defaultProps} value={time} />);

    expect(screen.getByDisplayValue(time)).toBeInTheDocument();
  });

  it('renders description', () => {
    const description = (
      <span data-testid="custom-description">Custom description</span>
    );
    render(<FormTimeInput {...defaultProps} description={description} />);

    expect(screen.getByTestId('custom-description')).toBeInTheDocument();
  });

  it('shows description id in aria-describedby', () => {
    const description = 'This is a description';
    render(<FormTimeInput {...defaultProps} description={description} />);

    const input = screen.getByLabelText(defaultProps.label);

    expect(input).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('test-time-description')
    );
    expect(screen.getByText(description).parentElement).toHaveAttribute(
      'id',
      'test-time-description'
    );
  });
});
