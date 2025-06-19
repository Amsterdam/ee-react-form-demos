import { ReactNode } from 'react';
import { ActionMeta } from 'react-select';
import {
  ErrorMessage,
  Field,
  Label,
  Paragraph,
} from '@amsterdam/design-system-react';
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
  error?: string;
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
  error,
  onChange,
  ...props
}: FormAutoSelectProps) => (
  <Field className="ams-mb-m" invalid={!!error}>
    <Label htmlFor={id}>{label}</Label>
    {typeof description === 'string' ? (
      <Paragraph id={`${id}-description`} size="small">
        {description}
      </Paragraph>
    ) : (
      description
    )}
    {error && <ErrorMessage id={`${id}-error`}>{error}</ErrorMessage>}
    <InputAutoSelect
      id={id}
      options={options}
      isMulti={isMulti}
      required={required}
      value={value}
      error={error}
      onChange={onChange}
      {...props}
    />
  </Field>
);

export default FormAutoSelect;
