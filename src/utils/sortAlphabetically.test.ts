import sortAlphabetically from './sortAlphabetically';
import { ReactSelectOption } from '@/components/InputAutoSelect/types';

describe('sortAlphabetically', () => {
  const a: ReactSelectOption = { label: 'Alpha', value: 'alpha' };
  const b: ReactSelectOption = { label: 'Beta', value: 'beta' };

  it('returns -1 when a.label < b.label', () => {
    expect(sortAlphabetically(a, b)).toBe(-1);
  });

  it('returns 1 when a.label > b.label', () => {
    expect(sortAlphabetically(b, a)).toBe(1);
  });

  it('returns 0 when labels are equal', () => {
    expect(sortAlphabetically(a, { label: 'Alpha', value: 'another' })).toBe(0);
  });

  it('sorts an array of options alphabetically by label', () => {
    const unsorted = [
      { label: 'React', value: 'react' },
      { label: 'Alpha', value: 'alpha' },
      { label: 'Node', value: 'node' },
    ];

    const sorted = [...unsorted].sort(sortAlphabetically);
    expect(sorted.map(o => o.label)).toEqual(['Alpha', 'Node', 'React']);
  });
});
