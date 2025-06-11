import { ReactNode } from 'react';
import {
  ErrorMessage,
  Field,
  Label,
  Paragraph,
  Select,
} from '@amsterdam/design-system-react';

interface FormSelectProps {
  id: string;
  label: string;
  description?: ReactNode;
  name: string;
  options: Record<string, string>;
  value?: string;
  required?: boolean;
  error?: string;
  onChange: (value: string) => void;
}

const FormSelect = ({
  id,
  label,
  description,
  name,
  options,
  value = '',
  required = false,
  error,
  onChange,
}: FormSelectProps) => (
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
    <Select
      aria-describedby={`${description ? `${id}-description` : ''} ${error ? `${id}-error` : ''}`}
      id={id}
      name={name}
      value={value}
      invalid={!!error}
      required={required}
      onChange={e => onChange(e.target.value)}
    >
      {Object.keys(options).map((optionValue, index) => (
        <Select.Option value={optionValue} key={`form-select-${index}`}>
          {options[optionValue]}
        </Select.Option>
      ))}
    </Select>
  </Field>
);

export default FormSelect;
