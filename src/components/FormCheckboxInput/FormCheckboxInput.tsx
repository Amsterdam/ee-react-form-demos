import { Checkbox, Field, Paragraph } from '@amsterdam/design-system-react';
import { ChangeEvent } from 'react';

interface FormCheckboxInputProps {
  id: string;
  label: string;
  description?: string;
  value: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormCheckboxInput = ({
  id,
  label,
  description,
  value,
  onChange,
}: FormCheckboxInputProps) => (
  <Field className="ams-mb-m">
    {description && (
      <Paragraph id={`${id}-description`} className="ams-mb-s" size="small">
        {description}
      </Paragraph>
    )}
    <Checkbox
      aria-describedby={description ? `${id}-description` : ''}
      id={id}
      onChange={onChange}
      checked={value}
    >
      {label}
    </Checkbox>
  </Field>
);

export default FormCheckboxInput;
