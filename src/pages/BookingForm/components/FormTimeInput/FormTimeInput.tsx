import { ChangeEvent, ReactNode } from 'react';
import {
  TimeInput as AmsTimeInput,
  Field,
  Label,
  Paragraph,
} from '@amsterdam/design-system-react';
import clsx from 'clsx';

interface FormTimeInputProps {
  id: string;
  label: string;
  description?: ReactNode;
  name: string;
  value: string;
  error?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormTimeInput = ({
  id,
  label,
  description,
  name,
  value,
  error,
  onChange,
}: FormTimeInputProps) => (
  <Field className="ams-mb-m">
    <Label htmlFor={id}>{label}</Label>
    {typeof description === 'string' ? (
      <Paragraph id={`${id}-description`} size="small">
        {description}
      </Paragraph>
    ) : (
      description
    )}

    <AmsTimeInput
      aria-describedby={clsx(
        { [`${id}-description`]: !!description },
        { [`${id}-error`]: error }
      )}
      id={id}
      name={name}
      value={value}
      data-testid={id}
      invalid={error}
      onChange={onChange}
    />
  </Field>
);

export default FormTimeInput;
