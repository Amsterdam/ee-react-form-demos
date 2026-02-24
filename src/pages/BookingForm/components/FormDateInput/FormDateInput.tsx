import { ChangeEvent, ReactNode } from 'react';
import {
  DateInput as AmsDateInput,
  Field,
  Label,
  Paragraph,
} from '@amsterdam/design-system-react';

import clsx from 'clsx';

interface FormDateInputProps {
  id: string;
  label: string;
  description?: ReactNode;
  name: string;
  value: string;
  minValue?: string;
  error?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormDateInput = ({
  id,
  label,
  description,
  name,
  value,
  minValue = undefined,
  error,
  onChange,
}: FormDateInputProps) => (
  <Field className="ams-mb-m">
    <Label htmlFor={id}>{label}</Label>
    {typeof description === 'string' ? (
      <Paragraph id={`${id}-description`} size="small">
        {description}
      </Paragraph>
    ) : (
      description
    )}

    <AmsDateInput
      aria-describedby={clsx(
        { [`${id}-description`]: !!description },
        { [`${id}-error`]: error }
      )}
      id={id}
      name={name}
      value={value}
      min={minValue}
      data-testid={id}
      invalid={error}
      onChange={onChange}
    />
  </Field>
);

export default FormDateInput;
