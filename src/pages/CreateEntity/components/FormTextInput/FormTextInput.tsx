import { ChangeEvent, ReactNode } from 'react';
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
  name: string;
  value: string;
  required?: boolean;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormTextInput = ({
  id,
  label,
  description,
  name,
  value,
  required = false,
  error,
  onChange,
  onBlur,
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
      name={name}
      value={value}
      invalid={!!error}
      required={required}
      onChange={onChange}
      onBlur={onBlur}
    />
  </Field>
);

export default FormTextInput;
