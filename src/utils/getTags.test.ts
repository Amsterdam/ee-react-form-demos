import getTags from './getTags';

describe('getTags', () => {
  it('returns an array of objects with label and value', () => {
    const tags = getTags();

    expect(tags).toEqual([
      { value: 'docusaurus', label: 'Docusaurus' },
      { value: 'nodejs', label: 'Nodejs' },
      { value: 'react', label: 'React' },
      { value: 'storybook', label: 'Storybook' },
      { value: 'typescript', label: 'Typescript' },
      { value: 'vitest', label: 'Vitest' },
    ]);
  });

  it('replaces whitespace with dashes and capitalizes first letter', () => {
    const result = getTags();

    for (const { label, value } of result) {
      expect(value).not.toMatch(/\s/); // no spaces
      expect(value).toBe(value.toLowerCase()); // all lowercase
      expect(label[0]).toBe(label[0].toUpperCase()); // first letter capitalized
    }
  });
});
