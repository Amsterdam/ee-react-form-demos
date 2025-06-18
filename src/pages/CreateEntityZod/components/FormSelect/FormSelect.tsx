import { ChangeEvent, ReactNode } from 'react';
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
  initialValue?: string;
  required?: boolean;
  error?: string;
  onChange: (name: string, value: string) => void;
  onBlur?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const FormSelect = ({
  id,
  label,
  description,
  name,
  options,
  initialValue = undefined,
  required = false,
  error,
  onChange,
  onBlur,
}: FormSelectProps) => (
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
    <Select
      aria-describedby={`${description ? `${id}-description` : ''} ${error ? `${id}-error` : ''}`}
      id={id}
      name={name}
      value={initialValue}
      required={required}
      invalid={!!error}
      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
        onChange(name, e.target.options[e.target.selectedIndex].value)
      }
      onBlur={onBlur}
    >
      {Object.keys(options).map((value, index) => (
        <Select.Option value={value} key={`form-select-${index}`}>
          {options[value]}
        </Select.Option>
      ))}
    </Select>
  </Field>
);

export default FormSelect;
