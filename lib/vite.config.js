import { defineConfig } from "vite";
import path from "path";

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, "composables/src/index.js"),
        name: "composables",
        fileName: "composables",
      },
      rollupOptions: {
        external: ["#app", "vue-router"],
        output: {
          globals: { "vue-router": "VueRouter" },
        },
      },
      outDir: "composables/dist",
    },
  };
});
