import { ClearIndicatorProps, components, GroupBase } from 'react-select';
import { CloseIcon } from '@amsterdam/design-system-react-icons';
import { ReactSelectOption } from '../types';

const ClearIndicator = (
  props: ClearIndicatorProps<
    ReactSelectOption,
    boolean,
    GroupBase<ReactSelectOption>
  >
) => (
  <components.ClearIndicator {...props}>
    <CloseIcon />
  </components.ClearIndicator>
);

export default ClearIndicator;
