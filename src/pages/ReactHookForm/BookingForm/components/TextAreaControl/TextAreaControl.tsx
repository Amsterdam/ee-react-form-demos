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

export type TextAreaControlProps<
  TFieldValues extends FieldValues = FieldValues,
> = TextAreaProps & FormControlBase<TFieldValues>;

const TextAreaControl = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  description,
  registerOptions,
  id,
  testId,
  cols,
  ...attributes
}: TextAreaControlProps<TFieldValues>) => {
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
              <ErrorMessage id={errorId}>{formState.errors[name]}</ErrorMessage>
            )}

            <TextArea
              name={name}
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
