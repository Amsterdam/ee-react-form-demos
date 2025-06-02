import {
  ActionMeta,
  GroupBase,
  MultiValue,
  OptionsOrGroups,
  Props as SelectProps,
} from 'react-select';
import { Field, Label, Paragraph } from '@amsterdam/design-system-react';
import InputAutoSelect from '../InputAutoSelect/InputAutoSelect';

// TODO refactor so this isn't present in both FormAutoSelect + InputAutoSelect
type SelectEventHandlers = Pick<
  SelectProps<unknown, boolean, GroupBase<unknown>>,
  | 'onChange'
  | 'onBlur'
  | 'onFocus'
  | 'onInputChange'
  | 'onKeyDown'
  | 'onMenuOpen'
  | 'onMenuClose'
  | 'onMenuScrollToTop'
  | 'onMenuScrollToBottom'
>;

type Option = {
  label: string;
  value: string;
};

interface FormAutoSelectProps extends SelectEventHandlers {
  label: string;
  name: string;
  description?: string;
  options: OptionsOrGroups<Option, GroupBase<Option>> | undefined;
  onChange: (
    newValue: MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => void;
}

const FormAutoSelect = ({
  label,
  name,
  description,
  options,
  onChange,
  ...props
}: FormAutoSelectProps) => (
  <Field className="ams-mb-m">
    <Label htmlFor="body">{label}</Label>
    {description && (
      <Paragraph id="bodyDescription" size="small">
        {description}
      </Paragraph>
    )}
    <InputAutoSelect
      options={options}
      isMulti
      onChange={onChange}
      name={name}
      {...props}
    />
  </Field>
);

export default FormAutoSelect;
