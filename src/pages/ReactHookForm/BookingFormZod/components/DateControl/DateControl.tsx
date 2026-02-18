import {
  DateInput,
  type DateInputProps,
  Field,
  Label,
  Paragraph,
} from '@amsterdam/design-system-react';
import type { FieldValues, RegisterOptions } from 'react-hook-form';
import clsx from 'clsx';
import FormControl from '../FormControl/FormControl';
import { FormControlBase } from '../../types';

// Merge design-system and react-hook-form types
export type DateControlProps<TFieldValues extends FieldValues> =
  DateInputProps & FormControlBase<TFieldValues>;

const DateControl = <T extends FieldValues>({
  name,
  label,
  description,
  registerOptions,
  id,
  ...attributes
}: DateControlProps<T>) => {
  const identifier = id || name;
  const descriptionId = `${identifier}-description`;

  const required = registerOptions?.required;
  const optional = !required;

  return (
    <FormControl>
      {({ register, formState }) => {
        const hasError = !!formState.errors[name];

        // We don't use invalid on the field or display an error message as we
        // already handle this in the DateTimeFieldset component
        return (
          <Field>
            {label && (
              <Label htmlFor={identifier} optional={optional}>
                {label}
              </Label>
            )}
            {description && (
              <Paragraph
                size="small"
                id={descriptionId}
                data-testid={descriptionId}
              >
                {description}
              </Paragraph>
            )}
            <DateInput
              aria-describedby={clsx({ [descriptionId]: !!descriptionId })}
              {...attributes}
              {...register(name, registerOptions as RegisterOptions)}
              id={identifier}
              invalid={hasError}
            />
          </Field>
        );
      }}
    </FormControl>
  );
};

export default DateControl;
