import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';


const config: StorybookConfig = {
  stories: [
    '../src/stories/Intro.mdx',
    '../src/stories/Terminologies.mdx',
    '../src/stories/JsxVsHtml.mdx',
    '../src/stories/FormFlow.mdx',
    '../src/stories/RemoteData.mdx',
    '../src/stories/Accessibility.mdx',
    '../src/stories/Alternatives.mdx',
    '../src/stories/React19.mdx',
    '../src/stories/Validation.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  viteFinal: async (config) => {
    // Merge custom vite config if needed
    return config;
  },
};

export default config;