import { components, DropdownIndicatorProps } from 'react-select';
import { ChevronDownIcon } from '@amsterdam/design-system-react-icons';

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon />
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
