import { storyblokLintConfig } from '@storyblok/eslint-config';

export default storyblokLintConfig({
  rules: {
    'no-console': 'off',
  },
}, {
  ignores: ['README.md', 'playground-e2e/plugins/storyblok.js', 'playground'],
});
