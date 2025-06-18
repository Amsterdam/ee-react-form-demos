import { ReactNode } from 'react';
import {
  ErrorMessage,
  Field,
  Label,
  Paragraph,
  TextArea,
} from '@amsterdam/design-system-react';

interface FormTextareaProps {
  id: string;
  label: string;
  description?: ReactNode;
  // name: string;
  value: string;
  required?: boolean;
  error?: string;
  onChange: (value: string) => void;
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
      value={value}
      required={required}
      onChange={e => onChange(e.target.value)}
    />
  </Field>
);

export default FormTextarea;
