import { Field, Label, Paragraph } from '@amsterdam/design-system-react';
import InputAutoSelect from '../InputAutoSelect/InputAutoSelect';
import getTags from '@/utils/getTags';

interface FormAutoSelectProps {
  label: string;
  description?: string;
}

const FormAutoSelect = ({ label, description }: FormAutoSelectProps) => (
  <Field className="ams-mb-m">
    <Label htmlFor="body">{label}</Label>
    {description && (
      <Paragraph id="bodyDescription" size="small">
        {description}
      </Paragraph>
    )}
    <InputAutoSelect options={getTags()} isMulti />
  </Field>
);

export default FormAutoSelect;
