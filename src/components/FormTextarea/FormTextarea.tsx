import {
  Field,
  Label,
  Paragraph,
  TextArea,
} from '@amsterdam/design-system-react';

interface FormTextareaProps {
  label: string;
  description?: string;
  value: string;
  error?: string;
}

const FormTextarea = ({
  label,
  description,
  value,
  // error,
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
    />
  </Field>
);

export default FormTextarea;
