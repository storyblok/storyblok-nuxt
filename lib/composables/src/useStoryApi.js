import { useNuxtApp } from "#app";

export default () => {
  const app = useNuxtApp();
  return app.$storyapi;
};
