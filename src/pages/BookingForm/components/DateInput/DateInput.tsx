import { ChangeEvent, ReactNode } from 'react';
import {
  DateInput as AmsDateInput,
  ErrorMessage,
  Field,
  Label,
  Paragraph,
} from '@amsterdam/design-system-react';

import clsx from 'clsx';

interface DateInputProps {
  id: string;
  label: string;
  description?: ReactNode;
  name: string;
  value: string;
  required?: boolean;
  minValue?: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const DateInput = ({
  id,
  label,
  description,
  name,
  value,
  required = false,
  minValue = undefined,
  error,
  onChange,
}: DateInputProps) => (
  <Field className="ams-mb-m">
    <Label htmlFor={id}>{label}</Label>
    {typeof description === 'string' ? (
      <Paragraph id={`${id}-description`} size="small">
        {description}
      </Paragraph>
    ) : (
      description
    )}
    {error && <ErrorMessage id={`${id}-error`}>{error}</ErrorMessage>}

    <AmsDateInput
      aria-describedby={clsx(
        { [`${id}-description`]: !!description },
        { [`${id}-error`]: !!error }
      )}
      id={id}
      name={name}
      value={value}
      min={minValue}
      required={required}
      data-testid={id}
      invalid={!!error}
      onChange={onChange}
    />
  </Field>
);

export default DateInput;
