import {
  Field,
  Label,
  Paragraph,
  TimeInput,
  type TimeInputProps,
} from '@amsterdam/design-system-react';
import type { FieldValues, RegisterOptions } from 'react-hook-form';
import clsx from 'clsx';
import FormControl from '../FormControl/FormControl';
import { FormControlBase } from '../../types';

// Merge design-system and react-hook-form types
export type TimeControlProps<TFieldValues extends FieldValues> =
  TimeInputProps & FormControlBase<TFieldValues>;

const TimeControl = <T extends FieldValues>({
  name,
  label,
  description,
  registerOptions,
  id,
  ...attributes
}: TimeControlProps<T>) => {
  const identifier = id || name;
  const descriptionId = `${identifier}-description`;
  const errorId = `${identifier}-error`;

  const required = registerOptions?.required;
  const optional = !required;

  return (
    <FormControl>
      {({ register, formState }) => {
        const hasError = !!formState.errors[name];

        return (
          <Field>
            {label && (
              <Label htmlFor={identifier} optional={optional}>
                {label}
              </Label>
            )}
            {description && (
              <Paragraph size="small" id={descriptionId}>
                {description}
              </Paragraph>
            )}
            <TimeInput
              aria-describedby={clsx(
                { [descriptionId]: !!description },
                { [errorId]: hasError }
              )}
              {...register(name, registerOptions as RegisterOptions)}
              id={identifier}
              invalid={hasError}
              {...attributes}
            />
          </Field>
        );
      }}
    </FormControl>
  );
};

export default TimeControl;
