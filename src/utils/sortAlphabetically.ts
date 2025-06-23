import { ReactSelectOption } from '@/components/InputAutoSelect/types';

// Sort an array of objects by `label` property
export default function sortAlphabetically(
  a: ReactSelectOption,
  b: ReactSelectOption
) {
  if (a.label < b.label) {
    return -1;
  }

  if (a.label > b.label) {
    return 1;
  }

  return 0;
}
