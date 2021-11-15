import { useNuxtApp } from "#app";
import { useRouter } from "vue-router";

export default (id, cb, options = {}) => {
  if (typeof window === "undefined") return;
  const app = useNuxtApp();
  const router = useRouter();

  app.$storybridge(
    () => {
      const sbBridge = new window.StoryblokBridge(options);

      sbBridge.on(["input", "published", "change"], (event) => {
        if (event.action == "input" && event.story.id === id) cb(event.story);
        else router.go({ path: router.currentRoute, force: true });
      });
    },
    (error) => {
      console.error(error);
    }
  );
};
