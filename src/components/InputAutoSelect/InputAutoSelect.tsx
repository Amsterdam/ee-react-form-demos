import Select, { GroupBase, OptionsOrGroups } from 'react-select';
import ClearIndicator from './ClearIndicator';
import DropdownIndicator from './DropdownIndicator';
import './styles.scss';

interface InputAutoSelectProps {
  isClearable?: boolean;
  isDisabled?: boolean;
  isMulti?: boolean;
  options: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined;
}

// WARNING: The following prop types are unstyled and untested:
// - isLoading
// - isRtl
const InputAutoSelect = ({
  isClearable = true,
  isDisabled = false,
  isMulti = false,
  options,
}: InputAutoSelectProps) => (
  <Select
    options={options}
    isClearable={isClearable}
    isDisabled={isDisabled}
    isMulti={isMulti}
    unstyled
    className="react-select__container"
    classNamePrefix="react-select"
    components={{
      // Override these components to use ADS SVG icons
      ClearIndicator,
      DropdownIndicator,
    }}
    noOptionsMessage={() => 'Geen opties'}
    styles={{
      container: (baseStyles, state) => ({
        ...baseStyles,
        outline: state.isFocused ? '1px solid rgb(0, 95, 204)' : '0',
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
