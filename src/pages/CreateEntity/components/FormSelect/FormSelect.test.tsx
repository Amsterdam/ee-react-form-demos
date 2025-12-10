import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import FormSelect from './FormSelect';

describe('FormSelect', () => {
  const testOptions = {
    option1: 'Option 1',
    option2: 'Option 2',
    option3: 'Option 3',
  };

  const defaultProps = {
    id: 'test-select',
    label: 'Test Label',
    name: 'testSelect',
    options: testOptions,
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with label, select and options', () => {
    render(<FormSelect {...defaultProps} />);

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();

    // Check that all options are rendered
    expect(
      screen.getByRole('option', { name: 'Option 1' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Option 2' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Option 3' })
    ).toBeInTheDocument();
  });

  it('handles user input', () => {
    const mockOnChange = vi.fn();
    render(<FormSelect {...defaultProps} onChange={mockOnChange} />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, {
      target: { value: 'option2', selectedIndex: 1 },
    });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('testSelect', 'option2');
  });

  it('handles onBlur event when provided', () => {
    const mockOnBlur = vi.fn();
    render(<FormSelect {...defaultProps} onBlur={mockOnBlur} />);

    const select = screen.getByRole('combobox');
    fireEvent.blur(select);

    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  it('renders with initial value', () => {
    render(<FormSelect {...defaultProps} initialValue="option2" />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('option2');
  });

  it('renders description when provided as string', () => {
    render(
      <FormSelect {...defaultProps} description="This is a description" />
    );

    expect(screen.getByText('This is a description')).toBeInTheDocument();
    expect(screen.getByText('This is a description')).toHaveAttribute(
      'id',
      'test-select-description'
    );
  });

  it('renders description when provided as ReactNode', () => {
    const customDescription = <span>Custom description node</span>;
    render(<FormSelect {...defaultProps} description={customDescription} />);

    expect(screen.getByText('Custom description node')).toBeInTheDocument();
  });

  it('shows description id in aria-describedby when description is provided', () => {
    render(<FormSelect {...defaultProps} description="Test description" />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute(
      'aria-describedby',
      'test-select-description'
    );
  });

  it('shows error message when error is provided', () => {
    render(<FormSelect {...defaultProps} error="This is an error" />);

    expect(screen.getByText('This is an error')).toBeInTheDocument();
    expect(screen.getByText('This is an error')).toHaveAttribute(
      'id',
      'test-select-error'
    );
  });

  it('shows error id in aria-describedby when error is provided', () => {
    render(<FormSelect {...defaultProps} error="Test error" />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-describedby', 'test-select-error');
  });

  it('combines description and error in aria-describedby when both are provided', () => {
    render(
      <FormSelect
        {...defaultProps}
        description="Test description"
        error="Test error"
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute(
      'aria-describedby',
      'test-select-description test-select-error'
    );
  });

  it('sets required attribute when required prop is true', () => {
    render(<FormSelect {...defaultProps} required />);

    const select = screen.getByRole('combobox');
    expect(select).toBeRequired();
  });

  it('sets invalid attribute when error is provided', () => {
    render(<FormSelect {...defaultProps} error="Test error" />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-invalid', 'true');
  });

  it('passes correct props to select element', () => {
    render(
      <FormSelect
        {...defaultProps}
        id="custom-id"
        name="customName"
        initialValue="option3"
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('id', 'custom-id');
    expect(select).toHaveAttribute('name', 'customName');
    expect(select).toHaveValue('option3');
  });

  it('renders options with correct values and labels', () => {
    render(<FormSelect {...defaultProps} />);

    const option1 = screen.getByRole('option', { name: 'Option 1' });
    const option2 = screen.getByRole('option', { name: 'Option 2' });
    const option3 = screen.getByRole('option', { name: 'Option 3' });

    expect(option1).toHaveValue('option1');
    expect(option2).toHaveValue('option2');
    expect(option3).toHaveValue('option3');
  });

  it('handles empty options object', () => {
    render(<FormSelect {...defaultProps} options={{}} />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(screen.queryByRole('option')).not.toBeInTheDocument();
  });

  it('does not call onBlur when onBlur prop is not provided', () => {
    render(<FormSelect {...defaultProps} />);

    const select = screen.getByRole('combobox');
    // This should not throw an error
    fireEvent.blur(select);
  });
});
