import {
  ErrorMessage,
  Field,
  Label,
  Paragraph,
  TextInput,
} from '@amsterdam/design-system-react';
import { ChangeEvent } from 'react';

interface FormTextInputProps {
  label: string;
  description?: string;
  value: string;
  required?: boolean;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FormTextInput = ({
  label,
  description,
  value,
  required = false,
  error,
  onChange,
}: FormTextInputProps) => (
  <Field className="ams-mb-m" invalid={!!error}>
    <Label htmlFor="input3">{label}</Label>
    {description && (
      <Paragraph id="description2" size="small">
        {description}
      </Paragraph>
    )}
    {error && <ErrorMessage id="error2">{error}</ErrorMessage>}
    <TextInput
      aria-describedby={`${description ? 'description2' : ''} ${error ? 'error2' : ''}`}
      id="input3"
      value={value}
      invalid={!!error}
      name="name"
      required={required}
      onChange={onChange}
    />
  </Field>
);

export default FormTextInput;
