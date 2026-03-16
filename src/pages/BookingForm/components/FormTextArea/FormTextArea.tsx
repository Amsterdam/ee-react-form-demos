import { ChangeEvent, ReactNode } from 'react';
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
  name: string;
  value: string;
  disabled?: boolean;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FormTextArea = ({
  id,
  label,
  description,
  name,
  value,
  disabled = false,
  error,
  onChange,
}: FormTextAreaProps) => (
  <Field className="ams-mb-xl">
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
      aria-describedby={clsx(
        { [`${id}-description`]: !!description },
        { [`${id}-error`]: !!error }
      )}
      id={id}
      name={name}
      value={value}
      disabled={disabled}
      rows={4}
      onChange={onChange}
    />
  </Field>
);

export default FormTextArea;
