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

const FormAutoSelect = ({ label }: FormAutoSelectProps) => (
  <Field className="ams-mb-xs">
    <label htmlFor="input5">{label}</label>
    <Select
      options={options}
      unstyled
      className="react-select__container"
      classNamePrefix="react-select"
      styles={{
        clearIndicator: baseStyles => ({
          ...baseStyles,
          color: 'rgb(102, 102, 102)',
        }),
        input: baseStyles => ({
          ...baseStyles,
          color: 'var(--ams-text-input-color)',
          // background: 'var(--ams-text-input-background-color)',
          background: 'transparent',
          opacity: 1,
          width: '100%',
          // gridArea: '1 / 2',
          font: 'var(--ams-text-input-font-weight) var(--ams-text-input-font-size) var(--ams-text-input-font-family)',
          // minWidth: '2px',
          // border: '0px',
          margin: '0px',
          // outline: '0px',
          padding: '0',
          // '0 calc(var(--ams-text-input-padding-block) * 2)',
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isFocused
            ? 'rgb(222, 235, 255)'
            : 'transparent',
        }),
      }}
      isClearable
      components={{
        ClearIndicator,
        DropdownIndicator,
      }}
    />
  </Field>
);

export default FormAutoSelect;
