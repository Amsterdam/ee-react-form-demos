import '@amsterdam/design-system-tokens/dist/index.css';
import '@amsterdam/design-system-tokens/dist/compact.theme.css';
import '@amsterdam/design-system-assets/font/index.css';
import '@amsterdam/design-system-css/dist/index.css';
import type { CSSProperties } from 'react';
import { Page } from '@amsterdam/design-system-react';
import { withThemeByClassName } from '@storybook/addon-themes';
import type { StoryContext, StoryFn } from '@storybook/react';
import { viewports } from './viewports';
import '../src/styles/overrides.css';

export const argTypes = {
  children: {
    table: { disable: true },
  },
};

// Wrap in Page, set language to Dutch for Canvas and Stories
export const decorators = [
  (Story: StoryFn, context: StoryContext) => {
    const pageBackgroundColor = context.parameters['pageBackgroundColor'];
    const pageStyle = pageBackgroundColor
      ? ({
          '--ams-page-background-color': pageBackgroundColor,
        } as CSSProperties)
      : undefined;

    return (
      <Page
        className={
          context.args['color'] === 'inverse'
            ? 'ams-docs-dark-background'
            : context.args['color'] === 'contrast'
              ? 'ams-docs-light-background'
              : ''
        }
        lang="nl"
        style={pageStyle}
      >
        {Story(context.args, context)}
      </Page>
    );
  },
  withThemeByClassName({
    defaultTheme: 'Spacious',
    themes: {
      Compact: 'ams-body ams-theme--compact',
      Spacious: 'ams-body',
    },
  }),
];

export const parameters = {
  backgrounds: {
    grid: {
      disable: true,
    },
    disabled: true,
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
    options: viewports,
  },
};
