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
  error?: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

const FormTextarea = ({
  label,
  description,
  value,
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
      onChange={onChange}
    />
  </Field>
);

export default FormTextarea;
