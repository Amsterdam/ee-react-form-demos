import { renderHook } from '@testing-library/react';
import { act } from 'react';
import useEntityFormValidation from './useEntityFormValidation';
import { EntityFormData } from '../schema';

const validFormData: EntityFormData = {
  kind: 'Component',
  name: 'MyComponent',
  description: 'A sample component',
  tags: ['react'],
  annotations: [{ key: 'team', value: 'frontend' }],
  links: [
    {
      url: 'https://example.com',
      title: 'Homepage',
      icon: 'launch',
    },
  ],
  spec: {
    type: 'service',
    lifecycle: 'production',
    owner: 'team-frontend',
    hasSystem: true,
    system: 'platform',
  },
};

describe('useEntityFormValidation', () => {
  it('returns no errors for valid form data', () => {
    const { result } = renderHook(() => useEntityFormValidation(validFormData));
    act(() => {
      const isValid = result.current.validateForm();
      expect(isValid).toBe(true);
    });
    expect(result.current.errors).toEqual({});
  });

  it('sets errors for missing required fields in validateForm', () => {
    const invalidData = {
      ...validFormData,
      kind: '',
      spec: {
        ...validFormData.spec,
        type: '',
        hasSystem: true,
        system: '',
      },
    };

    const { result } = renderHook(() => useEntityFormValidation(invalidData));

    act(() => {
      const isValid = result.current.validateForm();
      expect(isValid).toBe(false);
    });

    expect(result.current.errors).toMatchObject({
      kind: 'Select a kind',
      'spec.type': 'Select a type',
      'spec.system': 'Select a system',
    });
  });

  it('validates individual fields using validateField', () => {
    const { result } = renderHook(() =>
      useEntityFormValidation({
        ...validFormData,
        kind: '',
      })
    );

    act(() => {
      result.current.validateField('kind', '');
    });

    expect(result.current.errors.kind).toBe('Select a kind');

    act(() => {
      result.current.validateField('kind', 'Component');
    });

    expect(result.current.errors.kind).toBeUndefined();
  });

  it('clears a field error with clearFieldError', () => {
    const { result } = renderHook(() =>
      useEntityFormValidation({
        ...validFormData,
        kind: '',
      })
    );

    act(() => {
      result.current.validateField('kind', '');
    });

    expect(result.current.errors.kind).toBe('Select a kind');

    act(() => {
      result.current.clearFieldError('kind');
    });

    expect(result.current.errors.kind).toBeUndefined();
  });

  it('sets a custom error with setFieldError', () => {
    const { result } = renderHook(() => useEntityFormValidation(validFormData));

    act(() => {
      result.current.setFieldError('kind', 'Custom error');
    });

    expect(result.current.errors.kind).toBe('Custom error');
  });

  it('clears all errors with clearAllErrors', () => {
    const { result } = renderHook(() =>
      useEntityFormValidation({
        ...validFormData,
        kind: '',
      })
    );

    act(() => {
      result.current.validateForm();
    });

    expect(Object.keys(result.current.errors).length).toBeGreaterThan(0);

    act(() => {
      result.current.clearAllErrors();
    });

    expect(result.current.errors).toEqual({});
  });

  it('validates nested link field using validateField', () => {
    const data = {
      ...validFormData,
      links: [
        {
          url: '',
          title: 'My Link',
          icon: 'launch',
        },
      ],
    };

    const { result } = renderHook(() => useEntityFormValidation(data));

    act(() => {
      result.current.validateField('links.0.url', '');
    });

    expect(result.current.errors['links.0.url']).toBe('Enter a valid URL');

    act(() => {
      result.current.validateField('links.0.url', 'https://fixed.com');
    });

    expect(result.current.errors['links.0.url']).toBeUndefined();
  });
});
