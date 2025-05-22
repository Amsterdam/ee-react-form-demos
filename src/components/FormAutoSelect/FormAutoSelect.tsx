import { Field } from '@amsterdam/design-system-react';
import Select from 'react-select';
import ClearIndicator from './ClearIndicator';
import DropdownIndicator from './DropdownIndicator';
import './styles.scss';

const options = [
  {
    value: 'backstage.io/source-location',
    label: 'backstage.io/source-location',
  },
  { value: 'github.com/project-slug', label: 'github.com/project-slug' },
  { value: 'github.com/team-slug', label: 'github.com/team-slug' },
  { value: 'lighthouse.com/website-url', label: 'lighthouse.com/website-url' },
];

interface FormAutoSelectProps {
  label: string;
}

// TODO fix height
// TODO fix chevron height + color
// TODO dropdown menu option font-size
const FormAutoSelect = ({ label }: FormAutoSelectProps) => (
  <Field className="ams-mb-xs">
    <label htmlFor="input5">{label}</label>
    <Select
      options={options}
      unstyled
      className="react-select__container"
      classNamePrefix="react-select"
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
          color: 'var(--ams-text-input-color)',
          background: 'transparent',
          font: 'var(--ams-text-input-font-weight) var(--ams-text-input-font-size) var(--ams-text-input-font-family)',
          lineHeight: 'var(--ams-text-input-line-height)',
          margin: '0px',
          opacity: 1,
          width: '100%',
          padding: '0',
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isFocused
            ? 'rgb(222, 235, 255)'
            : 'transparent',
          fontSize: 'var(--ams-text-input-font-size)',
          // Hack to ensure background container box-shadow 'border' displays
          // marginLeft: '1px',
          // width: 'calc(100% - 2px)',
        }),
      }}
      isClearable
      components={{
        ClearIndicator,
        DropdownIndicator,
      }}
      noOptionsMessage={() => 'Geen opties'}
    />
  </Field>
);

export default FormAutoSelect;
