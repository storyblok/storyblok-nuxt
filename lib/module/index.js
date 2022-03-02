const path = require("path");

module.exports = function nuxtStoryblok(moduleOptions) {
  let options = Object.assign({}, this.options.storyblok, moduleOptions);
  this.addPlugin({
    src: path.resolve(__dirname, "plugin.js"),
    options,
  });

  const nuxtConfig = this.nuxt.options;
  const componentsPath = "~/components/storyblok";
  if (Array.isArray(nuxtConfig.components))
    nuxtConfig.components.push(componentsPath);
  else nuxtConfig.components = [componentsPath];

  // Disable Webpack 4 mjs support (has issues)
  this.extendBuild((config) => {
    if (!config.module) return;

    config.module.rules.forEach((rule) => {
      if (rule.test instanceof RegExp && rule.test.test("index.mjs")) {
        rule.type = "javascript/auto";
      }
    });

    config.module.rules.unshift({
      test: /\.mjs$/,
      type: "javascript/auto",
      include: [/node_modules/],
    });
  });
};

module.exports.meta = require("../package.json");
