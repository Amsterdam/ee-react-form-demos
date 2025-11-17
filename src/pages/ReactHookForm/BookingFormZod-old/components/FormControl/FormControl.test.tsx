import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, it, expect } from 'vitest';
import FormControl from './FormControl';

type FormValues = {
  name: string;
};

// Write a single 'smoke test' to avoid re-testing internal react-hook-form
// functionality
describe('FormControl', () => {
  it('passes useFormContext methods to children', () => {
    const TestComponent = () => {
      const methods = useForm<FormValues>({ defaultValues: { name: 'John' } });

      return (
        <FormProvider {...methods}>
          <FormControl<FormValues>>
            {({ register }) => (
              <input data-testid="name-input" {...register('name')} />
            )}
          </FormControl>
        </FormProvider>
      );
    };

    render(<TestComponent />);

    const input = screen.getByTestId('name-input') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.name).toBe('name');
  });
});
