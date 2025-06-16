import Select, { ActionMeta } from 'react-select';
import ClearIndicator from './components/ClearIndicator';
import DropdownIndicator from './components/DropdownIndicator';
import './InputAutoSelect.scss';
import { ReactSelectOption, ReactSelectValue } from './types';

interface InputAutoSelectProps {
  isClearable?: boolean;
  isDisabled?: boolean;
  isMulti?: boolean;
  options: ReactSelectOption[] | undefined;
  id?: string;
  name?: string;
  required?: boolean;
  value?: ReactSelectValue;
  error?: string;
  onChange: (
    newValue: ReactSelectValue,
    actionMeta: ActionMeta<ReactSelectOption>
  ) => void;
}

// WARNING: The following prop types are unstyled and untested:
// - isLoading
// - isRtl
const InputAutoSelect = ({
  isClearable = true,
  isDisabled = false,
  isMulti = false,
  options,
  id = undefined,
  name = undefined,
  required = false,
  value = undefined,
  error,
  ...eventHandlers
}: InputAutoSelectProps) => (
  <Select
    options={options}
    isClearable={isClearable}
    isDisabled={isDisabled}
    isMulti={isMulti}
    unstyled
    aria-errormessage={error}
    aria-invalid={!!error}
    className="react-select__container"
    classNamePrefix="react-select"
    components={{
      // Override these components to use ADS SVG icons
      ClearIndicator,
      DropdownIndicator,
    }}
    noOptionsMessage={() => 'Geen opties'}
    id={id}
    name={name}
    required={required}
    value={value}
    {...eventHandlers}
    styles={{
      container: (baseStyles, state) => ({
        ...baseStyles,
        outline: state.isFocused ? '2px solid -webkit-focus-ring-color' : '0',
      }),
      clearIndicator: baseStyles => ({
        ...baseStyles,
        color: 'rgb(102, 102, 102)',
      }),
      input: baseStyles => ({
        ...baseStyles,
        background: 'transparent',
        color: 'var(--ams-text-input-color)',
        font: 'var(--ams-text-input-font-weight) var(--ams-text-input-font-size) var(--ams-text-input-font-family)',
        lineHeight: 'var(--ams-text-input-line-height)',
        margin: '0px',
        opacity: 1,
        padding: '0',
      }),
      option: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: state.isFocused ? 'rgb(222, 235, 255)' : 'transparent',
        fontSize: 'var(--ams-text-input-font-size)',
      }),
    }}
  />
);

export default InputAutoSelect;
