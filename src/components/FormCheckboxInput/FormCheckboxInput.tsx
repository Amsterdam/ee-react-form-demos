import { Checkbox, Field, Paragraph } from '@amsterdam/design-system-react';
import { ChangeEvent } from 'react';

interface FormCheckboxInputProps {
  label: string;
  description?: string;
  value: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormCheckboxInput = ({
  label,
  description,
  value,
  onChange,
}: FormCheckboxInputProps) => (
  <Field className="ams-mb-m">
    {description && (
      <Paragraph className="ams-mb-s" size="small">
        {description}
      </Paragraph>
    )}
    <Checkbox onChange={onChange} checked={value}>
      {label}
    </Checkbox>
  </Field>
);

export default FormCheckboxInput;
