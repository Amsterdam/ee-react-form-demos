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
  options: Record<string, string>;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

// TODO options sometimes has different value to labels
// TODO dynamic IDs
// TOOD is name necessary? useful for accessibility?
const FormSelect = ({
  label,
  description,
  options,
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
      name="kind"
      onChange={onChange}
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
