import { ChangeEvent, ReactNode } from 'react';
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
  name: string;
  value: string;
  required?: boolean;
  error?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormTextarea = ({
  id,
  label,
  description,
  name,
  value,
  required = false,
  error,
  onChange,
  onBlur,
}: FormTextareaProps) => (
  <Field className="ams-mb-m">
    <Label htmlFor={id}>{label}</Label>
    {typeof description === 'string' ? (
      <Paragraph id={`${id}-description`} size="small">
        {description}
      </Paragraph>
    ) : (
      description
    )}
    {error && <ErrorMessage id={`${id}-error`}>{error}</ErrorMessage>}
    <TextArea
      aria-describedby={
        description ? `${id}-description ${error ? `${id}-error` : ''}` : ''
      }
      id={id}
      rows={4}
      name={name}
      value={value}
      required={required}
      onChange={onChange}
      onBlur={onBlur}
    />
  </Field>
);

export default FormTextarea;
