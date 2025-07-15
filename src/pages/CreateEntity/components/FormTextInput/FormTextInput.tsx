import { ChangeEvent, ReactNode } from 'react';
import {
  ErrorMessage,
  Field,
  Label,
  Paragraph,
  TextInput,
} from '@amsterdam/design-system-react';

interface FormTextInputProps {
  id: string;
  label: string;
  description?: ReactNode;
  name: string;
  value: string;
  required?: boolean;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
      aria-describedby={`${description ? `${id}-description` : ''} ${error ? `${id}-error` : ''}`}
      id={id}
      name={name}
      value={value}
      invalid={!!error}
      required={required}
      onChange={onChange}
      data-testid="input"
    />
  </Field>
);

export default FormTextInput;
