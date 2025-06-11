import { ChangeEvent } from 'react';
import {
  Field,
  Label,
  Paragraph,
  Select,
} from '@amsterdam/design-system-react';

interface FormSelectProps {
  id: string;
  label: string;
  description?: string;
  name: string;
  options: Record<string, string>;
  initialValue?: string;
  required?: boolean;
  onChange: (name: string, value: string) => void;
}

const FormSelect = ({
  id,
  label,
  description,
  name,
  options,
  initialValue = undefined,
  required = false,
  onChange,
}: FormSelectProps) => (
  <Field className="ams-mb-m">
    <Label htmlFor={id}>{label}</Label>
    {description && (
      <Paragraph id={`${id}-description`} size="small">
        {description}
      </Paragraph>
    )}
    <Select
      aria-describedby={description ? `${id}-description` : ''}
      id={id}
      name={name}
      value={initialValue}
      required={required}
      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
        onChange(name, e.target.options[e.target.selectedIndex].value)
      }
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
