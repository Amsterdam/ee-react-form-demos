import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormAutoSelect from './FormAutoSelect';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

describe('FormAutoSelect', () => {
  const defaultProps = {
    id: 'test-select',
    label: 'Test Label',
    name: 'test',
    options: [{ label: 'Option 1', value: '1' }],
    initialValues: [],
    onChange: vi.fn(),
  };

  it('renders with label and input', () => {
    render(<FormAutoSelect {...defaultProps} />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('renders initial single value', () => {
    render(
      <FormAutoSelect
        {...defaultProps}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ]}
        initialValues={['2']}
      />
    );

    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('renders initial multiple values', () => {
    render(
      <FormAutoSelect
        {...defaultProps}
        id="test-multi"
        label="Multi"
        name="multi"
        isMulti
        options={[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
        ]}
        initialValues={['1', '2']}
      />
    );

    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });

  it('calls onChange when user selects option', async () => {
    const onChange = vi.fn();
    render(
      <FormAutoSelect
        {...defaultProps}
        options={[{ label: 'Alpha', value: 'a' }]}
        onChange={onChange}
      />
    );

    const select = screen.getByLabelText(defaultProps.label);
    await userEvent.click(select);
    await userEvent.click(screen.getByText('Alpha'));

    expect(onChange).toHaveBeenCalled();
  });

  it('renders string description', () => {
    render(<FormAutoSelect {...defaultProps} description="Some help text" />);
    expect(screen.getByText('Some help text')).toBeInTheDocument();
  });

  it('renders JSX description', () => {
    render(
      <FormAutoSelect
        {...defaultProps}
        description={<div data-testid="custom-desc">Custom Desc</div>}
      />
    );

    expect(screen.getByTestId('custom-desc')).toBeInTheDocument();
  });

  it('calls onBlur when input is blurred', async () => {
    const onBlur = vi.fn();
    render(
      <FormAutoSelect
        {...defaultProps}
        id="blur-test"
        options={[{ label: 'Test', value: '1' }]}
        onBlur={onBlur}
      />
    );

    const input = screen.getByLabelText(defaultProps.label);

    act(() => {
      input.focus();
      input.blur();
    });

    expect(onBlur).toHaveBeenCalled();
  });

  it('marks field as required', () => {
    render(
      <FormAutoSelect
        {...defaultProps}
        id="req"
        label="Required field"
        name="req"
        required
      />
    );

    const input = screen.getByLabelText(/Required field/);
    expect(input).toBeRequired(); // works if `required` becomes `aria-required`
  });
});
