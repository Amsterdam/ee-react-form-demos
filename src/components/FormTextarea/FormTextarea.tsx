import {
  ErrorMessage,
  Field,
  Label,
  Paragraph,
  TextArea,
} from '@amsterdam/design-system-react';
import { ChangeEvent } from 'react';

interface FormTextareaProps {
  id: string;
  label: string;
  description?: string;
  value: string;
  required?: boolean;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FormTextarea = ({
  id,
  label,
  description,
  value,
  required = false,
  error,
  onChange,
}: FormTextareaProps) => (
  <Field className="ams-mb-m">
    <Label htmlFor={id}>{label}</Label>
    {description && (
      <Paragraph id={`${id}-description`} size="small">
        {description}
      </Paragraph>
    )}
    {error && <ErrorMessage id={`${id}-error`}>{error}</ErrorMessage>}
    <TextArea
      aria-describedby={
        description ? `${id}-description ${error ? `${id}-error` : ''}` : ''
      }
      id={id}
      rows={4}
      name="description"
      value={value}
      required={required}
      onChange={onChange}
    />
  </Field>
);

export default FormTextarea;
