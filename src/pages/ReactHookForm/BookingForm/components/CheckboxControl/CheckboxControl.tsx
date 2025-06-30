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

export type CheckboxControlProps<TFieldValues extends FieldValues> =
  CheckboxProps & FormControlBase<TFieldValues>;

const CheckboxControl = <T,>({
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
        const hasError = !!formState.errors[name];

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
              <ErrorMessage id={errorId}>{formState.errors[name]}</ErrorMessage>
            )}

            <Checkbox
              aria-describedby={`${descriptionId} ${errorId}`}
              name={name}
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
