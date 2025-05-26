export const TAGS = [
  'docusaurus',
  'nodejs',
  'react',
  'storybook',
  'typescript',
  'vitest',
];

const getTags = () =>
  TAGS.map(tag => ({
    // replace whitespace with dash
    value: tag.replace(/\s+/g, '-'),
    // capitalize first letters
    label: tag.charAt(0).toUpperCase() + tag.slice(1),
  }));

export default getTags;
