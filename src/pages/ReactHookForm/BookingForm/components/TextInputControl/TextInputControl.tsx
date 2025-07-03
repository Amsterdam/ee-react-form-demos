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
