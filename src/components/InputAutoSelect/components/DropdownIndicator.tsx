import { components, DropdownIndicatorProps, GroupBase } from 'react-select';
import { ChevronDownIcon } from '@amsterdam/design-system-react-icons';
import { ReactSelectOption } from '../types';

const DropdownIndicator = (
  props: DropdownIndicatorProps<
    ReactSelectOption,
    boolean,
    GroupBase<ReactSelectOption>
  >
) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon />
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
