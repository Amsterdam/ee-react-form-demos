# React Form Demos

Team responsible: Engineering Enablement team

## Aims of this repo

This project uses [Storybook](https://storybook.js.org/) to provide demos and examples of common form use-cases for Gemeente Amsterdam. 

There are two recommended approaches for building forms in [React](react.dev):

1. **Simple forms** — few fields, single level of hierarchy, no conditional logic → use [plain HTML5 forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form)
2. **Complex forms** — many fields, conditional child fields, or relations between fields → use [React Hook Form](https://react-hook-form.com)

Check out the [project storybook](https://amsterdam.github.io/ee-react-form-demos/) for documentation and demos.

If you are looking for a React Hook Form + Amsterdam Design System solution, check out our forms package [ee-ads-rhf](https://github.com/Amsterdam/ee-ads-rhf).

## How to use this repo?

This project is originally generated from a [repository template](https://github.com/amsterdam/ee-react-template/generate) and later adapted to use Storybook.

### Usage

The starter contains the following scripts:

- `start` - starts dev server
- `build-storybook` - generates the production bundle
- `test` - starts vitest and runs all tests
- `test:watch` - starts vitest and runs all tests and watch for file changes
- `test:coverage` - starts vitest and run all tests with code coverage report
- `lint:scripts` - lint `.ts`, `.tsx` and `.json` files with eslint
- `lint:styles` - lint `.css` and `.scss` files with stylelint
- `format:scripts` - format `.ts`, `.html` and `.json` files with prettier
- `format:styles` - format `.cs` and `.scss` files with stylelint
- `format` - format all with prettier and stylelint
- `prepare` - script for setting up husky pre-commit hook
- `uninstall-husky` - script for removing husky from repository

### Settings

By default `npm run start` will fire up a dev server with a random port (often 5173). You can configure a constant port in the `vite.config.ts` file; there is commented code showing to configure the port. There are many other options available as documented in the [vite docs](https://vitejs.dev/config/).

## How to contribute to this repo?

Simply create and submit a pull request. You can also contact us via Teams (DV - Enablement) or Slack (#dv-enablement).

## Acknowledgments

[Original template repo](https://github.com/kbysiec/vite-vanilla-ts-lib-starter)
