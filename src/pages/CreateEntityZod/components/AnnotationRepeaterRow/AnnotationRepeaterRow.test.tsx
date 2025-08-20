import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import AnnotationRepeaterRow from './AnnotationRepeaterRow';

describe('AnnotationRepeaterRow', () => {
  it('renders annotation row with heading and inputs', () => {
    render(
      <AnnotationRepeaterRow
        index={0}
        values={{ key: 'a', value: 'one' }}
        onChange={vi.fn()}
      />
    );

    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      'Annotation 1'
    );
    expect(screen.getByLabelText('Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Value')).toBeInTheDocument();
  });

  it('renders key and value errors', () => {
    render(
      <AnnotationRepeaterRow
        index={0}
        values={{ key: '', value: '' }}
        onChange={vi.fn()}
        keyError="Key error"
        valueError="Value error"
      />
    );

    const field = screen
      .getByLabelText('Type')
      .closest('[data-invalid], [aria-invalid="true"]');
    expect(field).toBeTruthy();
  });

  it('calls onChange with new key and default value on key change', async () => {
    const handleChange = vi.fn();

    render(
      <AnnotationRepeaterRow
        index={0}
        values={{ key: '', value: '' }}
        onChange={handleChange}
      />
    );

    const select = screen.getByLabelText('Type');

    await userEvent.click(select);
    await userEvent.click(screen.getByText('OIDC Provider'));

    expect(handleChange).toHaveBeenCalledWith(
      'amsterdam-internal/oidc-provider',
      '@azure/msal-react'
    );
  });

  it('calls onChange with updated value (text input)', async () => {
    const handleChange = vi.fn();

    render(
      <AnnotationRepeaterRow
        index={0}
        values={{ key: 'b', value: '' }} // key 'b' has no predefined values → uses TextInput
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText('Value');
    await fireEvent.change(input, { target: { value: 'hello' } });

    expect(handleChange).toHaveBeenCalledWith('b', 'hello');
  });

  it('calls onChange when select value is changed', async () => {
    const handleChange = vi.fn();

    render(
      <AnnotationRepeaterRow
        index={0}
        values={{
          key: 'amsterdam-internal/oidc-provider',
          value: '@azure/msal-react',
        }} // has dropdown values
        onChange={handleChange}
      />
    );

    const select = screen.getByLabelText('Value');
    await userEvent.selectOptions(select, 'keycloak');

    expect(handleChange).toHaveBeenCalledWith(
      'amsterdam-internal/oidc-provider',
      'keycloak'
    );
  });

  it('calls removeItem when delete button clicked', async () => {
    const handleRemove = vi.fn();

    render(
      <AnnotationRepeaterRow
        index={0}
        values={{ key: 'a', value: 'one' }}
        onChange={vi.fn()}
        removeItem={handleRemove}
      />
    );

    await userEvent.click(screen.getByRole('button', { name: /delete/i }));

    expect(handleRemove).toHaveBeenCalled();
  });
});
