import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1600,
    viewportHeight: 1400,
  },
});
