import { ClearIndicatorProps, components } from 'react-select';
import { CloseIcon } from '@amsterdam/design-system-react-icons';

const ClearIndicator = (props: ClearIndicatorProps) => (
  <components.ClearIndicator {...props}>
    <CloseIcon />
  </components.ClearIndicator>
);

export default ClearIndicator;
