import { ComponentPropsWithoutRef } from 'react';
import type { FieldValues, RegisterOptions } from 'react-hook-form';
import {
  ErrorMessage,
  Field,
  Label,
  Paragraph,
  TextInput,
  type TextInputProps,
} from '@amsterdam/design-system-react';
import clsx from 'clsx';
import FormControl from '../FormControl/FormControl';
import { FormControlBase } from '../../types';

// Merge design-system and react-hook-form types
export type TextInputControlProps<TFieldValues extends FieldValues> =
  TextInputProps &
    FormControlBase<TFieldValues> & {
      wrapperProps?: ComponentPropsWithoutRef<'div'>;
    };

const TextInputControl = <T extends FieldValues>({
  name,
  label,
  description,
  registerOptions,
  id,
  wrapperProps = { className: 'ams-mb-m' },
  ...attributes
}: TextInputControlProps<T>) => {
  const identifier = id || name;
  const descriptionId = `${identifier}-description`;
  const errorId = `${identifier}-error`;

  const required = registerOptions?.required;
  const optional = !required;

  return (
    <FormControl>
      {({ register, formState }) => {
        const errorMessage = formState.errors[name]?.message?.toString();
        const hasError = !!errorMessage;

        return (
          <Field {...wrapperProps} invalid={hasError}>
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
            {hasError && (
              <ErrorMessage id={errorId} data-testid={errorId}>
                {errorMessage}
              </ErrorMessage>
            )}
            <TextInput
              {...register(name, registerOptions as RegisterOptions)}
              {...attributes}
              aria-describedby={clsx(
                { [descriptionId]: !!description },
                { [errorId]: hasError }
              )}
              id={identifier}
              invalid={hasError}
              // Avoid the `required` prop when using ReactHookForm otherwise
              // the user is presented :invalid form fields on load before
              // touching the fields and gets inconsistent validation UX
              // required={!!required}
            />
          </Field>
        );
      }}
    </FormControl>
  );
};

export default TextInputControl;
