import {
  Field,
  Label,
  Paragraph,
  TextArea,
} from '@amsterdam/design-system-react';
import { ChangeEvent } from 'react';

interface FormTextareaProps {
  label: string;
  description?: string;
  value: string;
  required?: boolean;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FormTextarea = ({
  label,
  description,
  value,
  required = false,
  // error,
  onChange,
}: FormTextareaProps) => (
  <Field className="ams-mb-m">
    <Label htmlFor="body">{label}</Label>
    {description && (
      <Paragraph id="bodyDescription" size="small">
        {description}
      </Paragraph>
    )}
    <TextArea
      aria-describedby={description ? 'bodyDescription' : ''}
      id="body"
      rows={4}
      name="description"
      value={value}
      required={required}
      onChange={onChange}
    />
  </Field>
);

export default FormTextarea;
