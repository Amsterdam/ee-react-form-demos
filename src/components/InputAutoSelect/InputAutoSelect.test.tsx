import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InputAutoSelect from './InputAutoSelect';
import userEvent from '@testing-library/user-event';

describe('InputAutoSelect', () => {
  it('renders with options and selected value', () => {
    const handleChange = vi.fn();
    render(
      <InputAutoSelect
        options={[
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
        ]}
        value={{ value: 'one', label: 'One' }}
        onChange={handleChange}
      />
    );

    expect(screen.getByText('One')).toBeInTheDocument();
  });

  it('calls onChange when a new option is selected', async () => {
    const handleChange = vi.fn();
    render(
      <InputAutoSelect
        options={[
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
        ]}
        onChange={handleChange}
      />
    );

    const selectControl = screen.getByRole('combobox');
    await userEvent.click(selectControl);
    await userEvent.click(screen.getByText('Two'));

    expect(handleChange).toHaveBeenCalled();
  });

  it('adds aria-invalid and error message when error is passed', () => {
    render(
      <InputAutoSelect
        options={[]}
        error="This field is required"
        onChange={() => {}}
      />
    );

    const combo = screen.getByRole('combobox');
    expect(combo).toHaveAttribute('aria-invalid', 'true');
    expect(combo).toHaveAttribute(
      'aria-errormessage',
      'This field is required'
    );
  });

  it('adds aria-invalid and error message when error is passed', () => {
    render(
      <InputAutoSelect
        options={[]}
        error="This field is required"
        onChange={() => {}}
      />
    );

    const combo = screen.getByRole('combobox');
    expect(combo).toHaveAttribute('aria-invalid', 'true');
    expect(combo).toHaveAttribute(
      'aria-errormessage',
      'This field is required'
    );
  });

  it('respects isDisabled and isClearable props', () => {
    render(
      <InputAutoSelect
        options={[{ value: 'one', label: 'One' }]}
        isDisabled
        isClearable={false}
        onChange={() => {}}
      />
    );

    const combo = screen.getByRole('combobox', { hidden: true });
    expect(combo).toBeDisabled();
  });
});
