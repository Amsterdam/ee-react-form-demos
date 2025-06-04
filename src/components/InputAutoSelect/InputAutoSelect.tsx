import Select, {
  GroupBase,
  OptionsOrGroups,
  Props as SelectProps,
} from 'react-select';
import ClearIndicator from './ClearIndicator';
import DropdownIndicator from './DropdownIndicator';
import './styles.scss';

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

interface InputAutoSelectProps extends SelectEventHandlers {
  isClearable?: boolean;
  isDisabled?: boolean;
  isMulti?: boolean;
  options: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined;
  id?: string;
  name?: string;
  required?: boolean;
  // TODO type
  value?: unknown;
}

// TODO invalid styling

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
  ...eventHandlers
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
    id={id}
    name={name}
    required={required}
    defaultValue={value}
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
