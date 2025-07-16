import { ReactNode } from 'react';
import {
  ErrorMessage,
  Field,
  Label,
  Paragraph,
  TextInput,
} from '@amsterdam/design-system-react';
import clsx from 'clsx';

interface FormTextInputProps {
  id: string;
  label: string;
  description?: ReactNode;
  value: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  onChange: (value: string) => void;
}

const FormTextInput = ({
  id,
  label,
  description,
  value,
  required = false,
  error,
  onChange,
}: FormTextInputProps) => (
  <Field className="ams-mb-m" invalid={!!error}>
    <Label htmlFor={id}>{label}</Label>
    {typeof description === 'string' ? (
      <Paragraph id={`${id}-description`} size="small">
        {description}
      </Paragraph>
    ) : (
      description
    )}
    {error && <ErrorMessage id={`${id}-error`}>{error}</ErrorMessage>}
    <TextInput
      aria-describedby={clsx(
        { [`${id}-description`]: !!description },
        { [`${id}-error`]: !!error }
      )}
      id={id}
      value={value}
      invalid={!!error}
      name={id}
      required={required}
      onChange={e => onChange(e.target.value)}
    />
  </Field>
);

export default FormTextInput;
