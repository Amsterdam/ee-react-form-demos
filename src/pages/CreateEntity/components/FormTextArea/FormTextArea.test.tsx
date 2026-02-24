import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import FormTextArea from './FormTextArea';

describe('FormTextArea', () => {
  const defaultProps = {
    id: 'test-textarea',
    label: 'Test Label',
    name: 'testTextarea',
    value: '',
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with label and textarea', () => {
    render(<FormTextArea {...defaultProps} />);

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('handles user input', () => {
    const mockOnChange = vi.fn();
    render(<FormTextArea {...defaultProps} onChange={mockOnChange} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'test textarea content' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('displays validation errors', () => {
    render(<FormTextArea {...defaultProps} error="This is an error" />);

    expect(screen.getByText('This is an error')).toBeInTheDocument();
    expect(screen.getByText('This is an error')).toHaveAttribute(
      'id',
      'test-textarea-error'
    );
  });

  it('renders with initial value', () => {
    render(<FormTextArea {...defaultProps} value="initial textarea value" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('initial textarea value');
  });

  it('renders description when provided as string', () => {
    render(
      <FormTextArea {...defaultProps} description="This is a description" />
    );

    expect(screen.getByText('This is a description')).toBeInTheDocument();
    expect(
      screen.getByText('This is a description').parentElement
    ).toHaveAttribute('id', 'test-textarea-description');
  });

  it('renders description when provided as ReactNode', () => {
    const customDescription = <span>Custom description node</span>;
    render(<FormTextArea {...defaultProps} description={customDescription} />);

    expect(screen.getByText('Custom description node')).toBeInTheDocument();
  });

  it('shows description id in aria-describedby when description is provided', () => {
    render(<FormTextArea {...defaultProps} description="Test description" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute(
      'aria-describedby',
      'test-textarea-description'
    );
  });

  it('shows error id in aria-describedby when error is provided', () => {
    render(<FormTextArea {...defaultProps} error="Test error" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-describedby', 'test-textarea-error');
  });

  it('combines description and error in aria-describedby when both are provided', () => {
    render(
      <FormTextArea
        {...defaultProps}
        description="Test description"
        error="Test error"
      />
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute(
      'aria-describedby',
      'test-textarea-description test-textarea-error'
    );
  });

  it('sets required attribute when required prop is true', () => {
    render(<FormTextArea {...defaultProps} required />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeRequired();
  });

  it('sets rows attribute correctly', () => {
    render(<FormTextArea {...defaultProps} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '4');
  });

  it('passes correct props to textarea element', () => {
    render(
      <FormTextArea
        {...defaultProps}
        id="custom-id"
        name="customName"
        value="custom value"
      />
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('id', 'custom-id');
    expect(textarea).toHaveAttribute('name', 'customName');
    expect(textarea).toHaveValue('custom value');
  });
});
