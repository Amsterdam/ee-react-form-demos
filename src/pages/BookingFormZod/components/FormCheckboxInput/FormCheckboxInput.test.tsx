import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import FormCheckboxInput from './FormCheckboxInput';

describe('FormCheckboxInput', () => {
  const defaultProps = {
    id: 'test-input',
    label: 'Test Label',
    name: 'testInput',
    value: false,
    onChange: vi.fn(),
  };

  it('renders with label and input', () => {
    render(<FormCheckboxInput {...defaultProps} />);

    expect(screen.getByLabelText(defaultProps.label)).toBeInTheDocument();
    expect(screen.getByLabelText(defaultProps.label)).toHaveAttribute(
      'id',
      'test-input'
    );
  });

  it('handles user input', () => {
    const mockOnChange = vi.fn();
    render(<FormCheckboxInput {...defaultProps} onChange={mockOnChange} />);

    const input = screen.getByLabelText(defaultProps.label);
    fireEvent.click(input);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('renders initial value', () => {
    render(<FormCheckboxInput {...defaultProps} value={true} />);
    const input = screen.getByLabelText(defaultProps.label);
    expect((input as HTMLInputElement).checked).toBe(true);
  });

  it('renders description', () => {
    const description = 'Custom description';
    render(<FormCheckboxInput {...defaultProps} description={description} />);

    expect(screen.getByTestId('test-input-description')).toBeInTheDocument();
  });

  it('shows description id in aria-describedby', () => {
    const description = 'This is a description';
    render(<FormCheckboxInput {...defaultProps} description={description} />);

    const input = screen.getByLabelText(defaultProps.label);

    expect(input).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('test-input-description')
    );
    expect(screen.getByText(description)).toHaveAttribute(
      'id',
      'test-input-description'
    );
  });
});
