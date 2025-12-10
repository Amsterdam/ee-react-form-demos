import { ReactNode } from 'react';
import { ActionMeta } from 'react-select';
import { Field, Label, Paragraph } from '@amsterdam/design-system-react';
import InputAutoSelect from '@/components/InputAutoSelect/InputAutoSelect';
import {
  ReactSelectOption,
  ReactSelectValue,
} from '@/components/InputAutoSelect/types';

interface FormAutoSelectProps {
  id: string;
  label: string;
  name: string;
  description?: ReactNode;
  options: ReactSelectOption[] | undefined;
  initialValues: string[];
  required?: boolean;
  isMulti?: boolean;
  onChange: (
    newValue: ReactSelectValue,
    actionMeta: ActionMeta<ReactSelectOption>
  ) => void;
  onBlur?: () => void;
}

const FormAutoSelect = ({
  id,
  label,
  name,
  description,
  options,
  initialValues,
  required = false,
  isMulti = false,
  onChange,
  onBlur,
  ...props
}: FormAutoSelectProps) => {
  // Filter to exclude empty strings and find any already selected key-values
  const validValues = initialValues.filter(val => val && val.trim() !== '');
  const selectedValue =
    options?.filter(option => validValues.includes(option.value)) || [];

  // For react-select:
  // - Single select: null/undefined clears the selection
  // - Multi select: [] clears the selection
  const selectValue = isMulti
    ? selectedValue
    : selectedValue.length > 0
      ? selectedValue[0]
      : null;

  return (
    <Field className="ams-mb-m">
      <Label htmlFor={id}>{label}</Label>
      {typeof description === 'string' ? (
        <Paragraph id={`${id}-description`} size="small">
          {description}
        </Paragraph>
      ) : (
        description
      )}
      <InputAutoSelect
        id={id}
        options={options}
        isMulti={isMulti}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        required={required}
        value={selectValue}
        {...props}
      />
    </Field>
  );
};

export default FormAutoSelect;
