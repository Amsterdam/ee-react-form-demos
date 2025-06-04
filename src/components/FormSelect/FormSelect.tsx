import { ChangeEvent } from 'react';
import {
  Field,
  Label,
  Paragraph,
  Select,
} from '@amsterdam/design-system-react';

interface FormSelectProps {
  label: string;
  description?: string;
  name: string;
  options: Record<string, string>;
  initialValue?: string;
  required?: boolean;
  onChange: (name: string, value: string) => void;
}

const FormSelect = ({
  label,
  description,
  name,
  options,
  initialValue = undefined,
  required = false,
  onChange,
}: FormSelectProps) => (
  <Field className="ams-mb-m">
    <Label htmlFor="input2">{label}</Label>
    {description && (
      <Paragraph id="description2" size="small">
        {description}
      </Paragraph>
    )}
    <Select
      aria-describedby={description ? 'description2' : ''}
      id="input2"
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
