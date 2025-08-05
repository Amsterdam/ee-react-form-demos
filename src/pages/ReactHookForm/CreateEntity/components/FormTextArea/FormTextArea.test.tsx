import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormTextArea from './FormTextArea';

describe('FormTextArea', () => {
  const defaultProps = {
    id: 'test-textarea',
    label: 'Test Label',
    value: '',
    onChange: vi.fn(),
  };

  it('renders with label and textarea', () => {
    render(<FormTextArea {...defaultProps} />);

    expect(screen.getByLabelText(defaultProps.label)).toBeInTheDocument();
    expect(screen.getByLabelText(defaultProps.label)).toHaveAttribute(
      'id',
      'test-textarea'
    );
    expect(screen.getByLabelText(defaultProps.label)).toHaveAttribute(
      'rows',
      '4'
    );
  });

  it('handles user input', () => {
    const mockOnChange = vi.fn();
    render(<FormTextArea {...defaultProps} onChange={mockOnChange} />);

    const textarea = screen.getByLabelText(defaultProps.label);
    fireEvent.change(textarea, { target: { value: 'test value' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('displays validation errors', () => {
    const errorMessage = 'This field is required';
    render(<FormTextArea {...defaultProps} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByLabelText(defaultProps.label)).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('test-textarea-error')
    );
  });

  it('renders with initial value', () => {
    render(<FormTextArea {...defaultProps} value="initial textarea value" />);

    expect(
      screen.getByDisplayValue('initial textarea value')
    ).toBeInTheDocument();
  });

  it('renders description', () => {
    const description = (
      <span data-testid="custom-description">Custom description</span>
    );
    render(<FormTextArea {...defaultProps} description={description} />);

    expect(screen.getByTestId('custom-description')).toBeInTheDocument();
  });

  it('shows description id in aria-describedby', () => {
    const description = 'This is a description';
    render(
      <FormTextArea {...defaultProps} description={description} required />
    );

    const textarea = screen.getByLabelText(defaultProps.label);

    expect(textarea).toHaveAttribute('required');
    expect(textarea).toHaveAttribute(
      'aria-describedby',
      expect.stringContaining('test-textarea-description')
    );
    expect(screen.getByText(description)).toHaveAttribute(
      'id',
      'test-textarea-description'
    );
  });

  it('combines description and error in aria-describedby', () => {
    render(
      <FormTextArea {...defaultProps} description="Description" error="Error" />
    );

    const textarea = screen.getByLabelText(defaultProps.label);
    const describedBy = textarea.getAttribute('aria-describedby');

    expect(describedBy).toContain('test-textarea-description');
    expect(describedBy).toContain('test-textarea-error');
  });
});
