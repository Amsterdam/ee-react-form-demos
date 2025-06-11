import { Field, Paragraph, Checkbox } from '@amsterdam/design-system-react';

interface FormCheckboxInputProps {
  id: string;
  label: string;
  description?: string;
  value: boolean;
  onChange: (value: boolean) => void;
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
      onChange={e => onChange(e.target.checked)}
      checked={value}
    >
      {label}
    </Checkbox>
  </Field>
);

export default FormCheckboxInput;
