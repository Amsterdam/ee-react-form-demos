import {
  ErrorMessage,
  Field,
  Label,
  Paragraph,
  TextInput,
} from '@amsterdam/design-system-react';
import { ChangeEvent } from 'react';

interface FormTextInputProps {
  id: string;
  label: string;
  description?: string;
  value: string;
  required?: boolean;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
    {description && (
      <Paragraph id={`${id}-description`} size="small">
        {description}
      </Paragraph>
    )}
    {error && <ErrorMessage id={`${id}-error`}>{error}</ErrorMessage>}
    <TextInput
      aria-describedby={`${description ? `${id}-description` : ''} ${error ? `${id}-error` : ''}`}
      id={id}
      value={value}
      invalid={!!error}
      name="name"
      required={required}
      onChange={onChange}
    />
  </Field>
);

export default FormTextInput;
