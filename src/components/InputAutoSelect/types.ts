import { MultiValue, SingleValue } from 'react-select';

export type SelectValue<IsMulti extends boolean> = IsMulti extends true
  ? MultiValue<ReactSelectOption>
  : SingleValue<ReactSelectOption>;

export type ReactSelectOption = {
  value: string;
  label: string;
};

export type ReactSelectValue =
  | SingleValue<ReactSelectOption>
  | MultiValue<ReactSelectOption>;
