import { Field, Label, Paragraph } from '@amsterdam/design-system-react';
import InputAutoSelect from '../InputAutoSelect/InputAutoSelect';
import { GroupBase, OptionsOrGroups } from 'react-select';

interface FormAutoSelectProps {
  label: string;
  description?: string;
  options: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined;
}

const FormAutoSelect = ({
  label,
  description,
  options,
}: FormAutoSelectProps) => (
  <Field className="ams-mb-m">
    <Label htmlFor="body">{label}</Label>
    {description && (
      <Paragraph id="bodyDescription" size="small">
        {description}
      </Paragraph>
    )}
    <InputAutoSelect options={options} isMulti />
  </Field>
);

export default FormAutoSelect;
