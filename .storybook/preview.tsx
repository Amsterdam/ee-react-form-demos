import '@amsterdam/design-system-tokens/dist/index.css';
import '@amsterdam/design-system-tokens/dist/compact.css';
import '@amsterdam/design-system-assets/font/index.css';
import '@amsterdam/design-system-css/dist/index.css';
import { Page } from '@amsterdam/design-system-react';
import { withThemeByClassName } from '@storybook/addon-themes';
import type { StoryContext, StoryFn } from '@storybook/react';
import { viewports } from './viewports';

export const argTypes = {
  children: {
    table: { disable: true },
  },
};

// Wrap in Page, set language to Dutch for Canvas and Stories
export const decorators = [
  (Story: StoryFn, context: StoryContext) => (
    <Page
      className={
        context.args['color'] === 'inverse'
          ? 'ams-docs-dark-background'
          : context.args['color'] === 'contrast'
            ? 'ams-docs-light-background'
            : ''
      }
      lang="nl"
    >
      {Story(context.args, context)}
    </Page>
  ),
  withThemeByClassName({
    defaultTheme: 'Spacious',
    themes: {
      Compact: 'ams-theme--compact',
      Spacious: '',
    },
  }),
];

export const parameters = {
  backgrounds: {
    disable: true,
    grid: {
      disable: true,
    },
  },
  controls: {
    sort: 'alpha', // Sorts controls in the Controls addon
  },
  docs: {
    controls: {
      sort: 'alpha', // Sorts controls in the Controls doc block – https://github.com/storybookjs/storybook/issues/25386#issuecomment-1905468177
    },
  },
  html: {
    root: '.ams-page',
  },
  options: {
    storySort: {
      order: [
        'Docs',
        [
          'Introduction',
          'Accessibility',
          'Alternative Solutions',
          'Definitions & Terminologies',
          'Form Submission Flow',
          'Handling Remote Data',
          'UX Patterns',
          'Validation',
          'Which Approach Should I Use?',
          'React',
          'Security',
          'Testing',
        ],
        'Plain HTML5',
        'ReactHookForm',
      ],
    },
  },
  viewMode: 'docs',
  viewport: {
    viewports,
  },
};
