import {
  ErrorMessage,
  Field,
  Label,
  Paragraph,
  TextInput,
  type TextInputProps,
} from '@amsterdam/design-system-react';
import type { FieldValues, RegisterOptions } from 'react-hook-form';
import FormControl from '../FormControl/FormControl';
import { FormControlBase } from '../../types';

export type TextInputControlProps<TFieldValues extends FieldValues> =
  TextInputProps & FormControlBase<TFieldValues>;

const TextInputControl = <T,>({
  name,
  label,
  description,
  registerOptions,
  id,
  testId,
  ...attributes
}: TextInputControlProps<T>) => {
  const identifier = testId || id || name;
  const descriptionId = `${identifier}-description`;
  const errorId = `${identifier}-error`;

  const required = registerOptions?.required;
  const optional = !required;

  return (
    <FormControl>
      {({ register, formState }) => {
        const hasError = !!formState.errors[name];
console.log('input', { registerOptions, formState });
        return (
          <Field
            className="ams-mb-m"
            invalid={hasError}
            data-testid={`${identifier}-text-input-wrapper`}
          >
            {label && (
              <Label
                htmlFor={identifier}
                data-testid={`${identifier}-label`}
                optional={optional}
              >
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
            {hasError && (
              <ErrorMessage id={errorId}>
                {formState.errors[name].message}
              </ErrorMessage>
            )}
            <TextInput
              aria-describedby={`${descriptionId} ${errorId}`}
              {...attributes}
              {...register(name, registerOptions as RegisterOptions)}
              id={identifier}
              data-testid={identifier}
              invalid={hasError}
              required={!!required}
            />
          </Field>
        );
      }}
    </FormControl>
  );
};

export default TextInputControl;
