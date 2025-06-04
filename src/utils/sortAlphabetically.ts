import { ReactSelectOption } from '@/types';

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
