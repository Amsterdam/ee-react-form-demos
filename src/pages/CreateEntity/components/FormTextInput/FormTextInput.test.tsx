import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import FormTextInput from './FormTextInput';

describe('FormTextInput', () => {
  const defaultProps = {
    id: 'test-input',
    label: 'Test Label',
    name: 'testInput',
    value: '',
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with label and input', () => {
    render(<FormTextInput {...defaultProps} />);

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('handles user input', () => {
    const mockOnChange = vi.fn();
    render(<FormTextInput {...defaultProps} onChange={mockOnChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test input' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('renders with initial value', () => {
    render(<FormTextInput {...defaultProps} value="initial value" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('initial value');
  });

  it('renders description when provided as string', () => {
    render(
      <FormTextInput {...defaultProps} description="This is a description" />
    );

    expect(
      screen.getByText('This is a description').parentElement
    ).toBeInTheDocument();
    expect(
      screen.getByText('This is a description').parentElement
    ).toHaveAttribute('id', 'test-input-description');
  });

  it('renders description when provided as ReactNode', () => {
    const customDescription = <span>Custom description node</span>;
    render(<FormTextInput {...defaultProps} description={customDescription} />);

    expect(screen.getByText('Custom description node')).toBeInTheDocument();
  });

  it('shows description id in aria-describedby when description is provided', () => {
    render(<FormTextInput {...defaultProps} description="Test description" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'test-input-description');
  });

  it('shows error message when error is provided', () => {
    render(<FormTextInput {...defaultProps} error="This is an error" />);

    expect(screen.getByText('This is an error')).toBeInTheDocument();
    expect(screen.getByText('This is an error')).toHaveAttribute(
      'id',
      'test-input-error'
    );
  });

  it('shows error id in aria-describedby when error is provided', () => {
    render(<FormTextInput {...defaultProps} error="Test error" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
  });

  it('shows both description and error ids in aria-describedby when both are provided', () => {
    render(
      <FormTextInput
        {...defaultProps}
        description="Test description"
        error="Test error"
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute(
      'aria-describedby',
      'test-input-description test-input-error'
    );
  });

  it('sets required attribute when required prop is true', () => {
    render(<FormTextInput {...defaultProps} required />);

    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });

  it('sets invalid attribute when error is provided', () => {
    render(<FormTextInput {...defaultProps} error="Test error" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('passes correct props to input element', () => {
    render(
      <FormTextInput
        {...defaultProps}
        id="custom-id"
        name="customName"
        value="custom value"
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'custom-id');
    expect(input).toHaveAttribute('name', 'customName');
    expect(input).toHaveValue('custom value');
  });
});
