import {
  ErrorMessage,
  Field,
  Label,
  Paragraph,
  TextInput,
} from '@amsterdam/design-system-react';

interface FormTextInputProps {
  label: string;
  description?: string;
  value: string;
  error?: string;
}

const FormTextInput = ({
  label,
  description,
  value,
  error,
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
    />
  </Field>
);

export default FormTextInput;
