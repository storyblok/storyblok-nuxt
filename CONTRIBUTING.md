# Contributing Guidelines

Thank you for considering contributing to this package. Please take a moment to review [Storyblok's general contributing guidelines](https://github.com/storyblok/.github/blob/main/CONTRIBUTING.md) if it's your first time to find info on submitting PR or issues.

## Contributing to the code

Find useful these guidelines and set of recommendations to help improving this library.

### Setup

This package relies on [pnpm workspaces](https://pnpm.io/workspaces) to manage dependencies. For instructions on how to install pnpm, please visit [pnpm.io](https://pnpm.io/installation).

```bash
pnpm install
```

### Build

```bash
pnpm build
```

### Development

We strongly recommend using the `playgrounds` within the package to develop and manually test the package.

Make sure the playground project has the root project as a dependency using `workspace:^` in the `package.json`:

```json
{
  "dependencies": {
    "@storyblok/nuxt": "workspace:^"
  }
}
```

Use the Google Chrome developer tools to debug the package from the playground project by resolving the package from the local file system in your `vite.config.ts` file. Example:

```ts
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@storyblok/nuxt': resolve(__dirname, '../src/index.ts'),
    },
  },
});
```

### Test

Depending on the package, you might have a combination of unit tests, integration tests, and/or end-to-end tests. Make sure to check `scripts` in `package.json` and run the right command, like:

```bash
pnpm test
```
