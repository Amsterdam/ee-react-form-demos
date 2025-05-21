import { TextInput } from '@amsterdam/design-system-react';
import { components } from 'react-select';

// Define the actual component
const CustomInput = (props: React.ComponentProps<typeof components.Input>) => {
  const { value, onChange, onBlur, onFocus, id, isDisabled } = props;

  return (
    <TextInput
      // Pass the essential react-select props
      id={id}
      value={value || ''}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={isDisabled}
      type="text"
    />
  );
};

export default CustomInput;
