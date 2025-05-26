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

// TODO isMulti state

// The following props are untested:
// - isLoading
// - isRtl
const FormAutoSelect = ({ label }: FormAutoSelectProps) => (
  <Field className="ams-mb-xs">
    <label htmlFor="input5">{label}</label>
    <Select
      options={options}
      isClearable
      unstyled
      className="react-select__container"
      classNamePrefix="react-select"
      components={{
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
          width: '100%',
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isFocused
            ? 'rgb(222, 235, 255)'
            : 'transparent',
          fontSize: 'var(--ams-text-input-font-size)',
        }),
      }}
    />
  </Field>
);

export default FormAutoSelect;
