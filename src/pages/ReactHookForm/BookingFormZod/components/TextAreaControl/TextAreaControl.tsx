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
  testId,
  cols,
  ...attributes
}: TextAreaControlProps<T>) => {
  const identifier = testId || id || name;
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
          <Field
            data-testid={`${identifier}-textarea-input-wrapper`}
            invalid={hasError}
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
              <ErrorMessage id={errorId}>{errorMessage}</ErrorMessage>
            )}

            <TextArea
              {...register(name, registerOptions as RegisterOptions)}
              id={identifier}
              data-testid={identifier}
              cols={cols}
              invalid={hasError}
              {...attributes}
            />
          </Field>
        );
      }}
    </FormControl>
  );
};

export default TextAreaControl;
