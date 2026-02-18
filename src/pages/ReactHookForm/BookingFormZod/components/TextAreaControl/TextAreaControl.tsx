import { FieldValues, RegisterOptions } from 'react-hook-form';
import {
  ErrorMessage,
  Field,
  Label,
  Paragraph,
  TextArea,
  TextAreaProps,
} from '@amsterdam/design-system-react';
import FormControl from '../FormControl/FormControl';
import { FormControlBase } from '../../types';
import clsx from 'clsx';

// Merge design-system and react-hook-form types
export type TextAreaControlProps<
  TFieldValues extends FieldValues = FieldValues,
> = TextAreaProps & FormControlBase<TFieldValues>;

const TextAreaControl = <T extends FieldValues>({
  name,
  label,
  description,
  registerOptions,
  id,
  cols,
  ...attributes
}: TextAreaControlProps<T>) => {
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
          <Field invalid={hasError}>
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
              <ErrorMessage id={errorId}>{errorMessage}</ErrorMessage>
            )}

            <TextArea
              {...register(name, registerOptions as RegisterOptions)}
              {...attributes}
              aria-describedby={clsx(
                { [descriptionId]: !!descriptionId },
                { [errorId]: hasError }
              )}
              id={identifier}
              cols={cols}
              invalid={hasError}
            />
          </Field>
        );
      }}
    </FormControl>
  );
};

export default TextAreaControl;
