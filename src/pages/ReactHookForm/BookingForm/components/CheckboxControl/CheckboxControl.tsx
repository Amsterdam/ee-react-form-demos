import type { FieldValues, RegisterOptions } from 'react-hook-form';
import {
  Field,
  Checkbox,
  Paragraph,
  type CheckboxProps,
  ErrorMessage,
} from '@amsterdam/design-system-react';
import FormControl from '../FormControl/FormControl';
import { FormControlBase } from '../../types';

// Merge design-system and react-hook-form types
export type CheckboxControlProps<TFieldValues extends FieldValues> =
  CheckboxProps & FormControlBase<TFieldValues>;

const CheckboxControl = <T extends FieldValues>({
  name,
  label,
  description,
  registerOptions,
  id,
  disabled,
  testId,
  indeterminate,
  icon,
  ...attributes
}: CheckboxControlProps<T>) => {
  const identifier = testId || id || name;
  const descriptionId = `${identifier}-description`;
  const errorId = `${identifier}-error`;

  return (
    <FormControl>
      {({ register, formState }) => {
        const errorMessage = formState.errors[name]?.message?.toString();
        const hasError = !!errorMessage;

        return (
          <Field
            className="ams-mb-m"
            data-testid={`${identifier}-checkbox-wrapper`}
            invalid={hasError}
          >
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

            <Checkbox
              aria-describedby={`${descriptionId} ${errorId}`}
              {...register(name, registerOptions as RegisterOptions)}
              data-testid={identifier}
              id={identifier}
              invalid={hasError}
              disabled={disabled}
              indeterminate={indeterminate}
              icon={icon}
              {...attributes}
            >
              {label && label}
            </Checkbox>
          </Field>
        );
      }}
    </FormControl>
  );
};

export default CheckboxControl;
