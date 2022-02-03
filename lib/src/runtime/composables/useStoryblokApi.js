import { useRuntimeConfig } from "#app";

export default () => {
  const { storyblok } = useRuntimeConfig();
  console.log(storyblok);
  // Use runtime config
  console.log("USE STORYBLOK API");
};
