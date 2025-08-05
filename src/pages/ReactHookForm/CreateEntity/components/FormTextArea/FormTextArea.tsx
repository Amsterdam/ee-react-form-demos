import { ReactNode } from 'react';
import {
  ErrorMessage,
  Field,
  Label,
  Paragraph,
  TextArea,
} from '@amsterdam/design-system-react';
import clsx from 'clsx';

interface FormTextAreaProps {
  id: string;
  label: string;
  description?: ReactNode;
  value: string;
  required?: boolean;
  error?: string;
  onChange: (value: string) => void;
}

const FormTextArea = ({
  id,
  label,
  description,
  value,
  required = false,
  error,
  onChange,
}: FormTextAreaProps) => (
  <Field className="ams-mb-m">
    <Label htmlFor={id}>{label}</Label>
    {description && (
      <Paragraph id={`${id}-description`} size="small">
        {description}
      </Paragraph>
    )}
    {error && <ErrorMessage id={`${id}-error`}>{error}</ErrorMessage>}
    <TextArea
      aria-describedby={clsx(
        { [`${id}-description`]: !!description },
        { [`${id}-error`]: !!error }
      )}
      id={id}
      value={value}
      required={required}
      rows={4}
      onChange={e => onChange(e.target.value)}
    />
  </Field>
);

export default FormTextArea;
