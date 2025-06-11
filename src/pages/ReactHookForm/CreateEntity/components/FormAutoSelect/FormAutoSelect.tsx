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
  description?: ReactNode;
  options: ReactSelectOption[] | undefined;
  required?: boolean;
  isMulti?: boolean;
  value: ReactSelectValue;
  onChange: (
    value: ReactSelectValue,
    actionMeta: ActionMeta<ReactSelectOption>
  ) => void;
}

const FormAutoSelect = ({
  id,
  label,
  description,
  options,
  required = false,
  isMulti = false,
  value,
  onChange,
  ...props
}: FormAutoSelectProps) => {
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
        required={required}
        value={value}
        {...props}
      />
    </Field>
  );
};

export default FormAutoSelect;
