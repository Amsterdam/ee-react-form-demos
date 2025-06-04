import { ActionMeta } from 'react-select';
import { Field, Label, Paragraph } from '@amsterdam/design-system-react';
import InputAutoSelect from '../InputAutoSelect/InputAutoSelect';
import { ReactSelectOption, ReactSelectValue } from '../InputAutoSelect/types';

interface FormAutoSelectProps {
  label: string;
  name: string;
  description?: string;
  options: ReactSelectOption[] | undefined;
  initialValues: string[];
  required?: boolean;
  isMulti?: boolean;
  onChange: (
    newValue: ReactSelectValue,
    actionMeta: ActionMeta<ReactSelectOption>
  ) => void;
}

const FormAutoSelect = ({
  label,
  name,
  description,
  options,
  initialValues,
  required = false,
  isMulti = false,
  onChange,
  ...props
}: FormAutoSelectProps) => {
  const selectedValue = options?.filter(option =>
    initialValues.includes(option.value)
  );

  return (
    <Field className="ams-mb-m">
      <Label htmlFor="body">{label}</Label>
      {description && (
        <Paragraph id="bodyDescription" size="small">
          {description}
        </Paragraph>
      )}
      <InputAutoSelect
        options={options}
        isMulti={isMulti}
        onChange={onChange}
        name={name}
        required={required}
        value={isMulti ? selectedValue : selectedValue?.[0]}
        {...props}
      />
    </Field>
  );
};

export default FormAutoSelect;
