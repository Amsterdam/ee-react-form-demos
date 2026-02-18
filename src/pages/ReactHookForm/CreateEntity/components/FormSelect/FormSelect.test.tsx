import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import FormSelect from './FormSelect';
import userEvent from '@testing-library/user-event';

describe('FormSelect', () => {
  const defaultProps = {
    id: 'test-select',
    label: 'Test Label',
    options: {
      option1: 'Option 1',
      option2: 'Option 2',
      option3: 'Option 3',
    },
    onChange: vi.fn(),
  };

  it('renders with label, select and options', () => {
    render(<FormSelect {...defaultProps} />);

    expect(screen.getByLabelText(defaultProps.label)).toBeInTheDocument();
    expect(screen.getByLabelText(defaultProps.label)).toHaveAttribute(
      'id',
      'test-select'
    );
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('handles user input', async () => {
    const mockOnChange = vi.fn();
    render(<FormSelect {...defaultProps} onChange={mockOnChange} />);

    const select = screen.getByLabelText(defaultProps.label);
    await userEvent.selectOptions(select, 'Option 2');

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('option2');
  });

  it('renders with initial value', () => {
    render(<FormSelect {...defaultProps} value="option2" />);

    const select = screen.getByLabelText(defaultProps.label);
    expect(select).toHaveValue('option2');
  });

  it('renders description', () => {
    const description = (
      <span data-testid="custom-description">Custom description</span>
    );
    render(<FormSelect {...defaultProps} description={description} />);

    expect(screen.getByTestId('custom-description')).toBeInTheDocument();
  });

  it('shows description id in aria-describedby', () => {
    const description = 'This is a description';
    render(<FormSelect {...defaultProps} description={description} required />);

    const select = screen.getByLabelText(defaultProps.label);

    expect(select).toHaveAttribute('required');
    expect(select).toHaveAttribute(
      'aria-describedby',
      'test-select-description'
    );
    expect(screen.getByText(description).parentElement).toHaveAttribute(
      'id',
      'test-select-description'
    );
  });
});
