import { GroupBase, OptionsOrGroups, Props as SelectProps } from 'react-select';
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

interface FormAutoSelectProps extends SelectEventHandlers {
  label: string;
  description?: string;
  options: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined;
}

const FormAutoSelect = ({
  label,
  description,
  options,
  ...props
}: FormAutoSelectProps) => (
  <Field className="ams-mb-m">
    <Label htmlFor="body">{label}</Label>
    {description && (
      <Paragraph id="bodyDescription" size="small">
        {description}
      </Paragraph>
    )}
    <InputAutoSelect options={options} isMulti onChange={() => {}} {...props} />
  </Field>
);

export default FormAutoSelect;
