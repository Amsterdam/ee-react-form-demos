import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormTextInput from './FormTextInput';

describe('FormTextInput', () => {
  const defaultProps = {
    id: 'test-input',
    label: 'Test Label',
    name: 'testInput',
    value: '',
    onChange: vi.fn(),
  };

  it('renders with label and input', () => {
    render(<FormTextInput {...defaultProps} />);

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByTestId('input')).toBeInTheDocument();
    expect(screen.getByTestId('input')).toHaveAttribute('id', 'test-input');
    expect(screen.getByTestId('input')).toHaveAttribute('name', 'testInput');
  });

  it('handles user input', () => {
    const mockOnChange = vi.fn();
    render(<FormTextInput {...defaultProps} onChange={mockOnChange} />);

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('displays validation errors', () => {
    const errorMessage = 'This field is required';
    render(<FormTextInput {...defaultProps} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByTestId('input')).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('test-input-error')
    );
  });

  it('renders initial value', () => {
    render(<FormTextInput {...defaultProps} value="initial value" />);

    expect(screen.getByDisplayValue('initial value')).toBeInTheDocument();
  });

  it('renders description', () => {
    const description = (
      <span data-testid="custom-description">Custom description</span>
    );
    render(<FormTextInput {...defaultProps} description={description} />);

    expect(screen.getByTestId('custom-description')).toBeInTheDocument();
  });

  it('sets invalid state when error is present', () => {
    render(<FormTextInput {...defaultProps} error="Error message" />);

    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('test-input-error')
    );
  });

  it('shows description in aria-describedby', () => {
    const description = 'This is a description';
    render(
      <FormTextInput {...defaultProps} description={description} required />
    );

    const input = screen.getByTestId('input');

    // Check required attribute
    expect(input).toHaveAttribute('required');

    // Check aria-describedby includes description
    expect(input).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('test-input-description')
    );

    // Check description is rendered with correct id
    expect(screen.getByText(description)).toHaveAttribute(
      'id',
      'test-input-description'
    );
  });

  it('combines description and error in aria-describedby', () => {
    render(
      <FormTextInput
        {...defaultProps}
        description="Description"
        error="Error"
      />
    );

    const input = screen.getByTestId('input');
    const describedBy = input.getAttribute('aria-describedby');

    expect(describedBy).toContain('test-input-description');
    expect(describedBy).toContain('test-input-error');
  });
});
